from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from datetime import timedelta

from backend import settings
from backend.models.base import BaseClass
from backend.auth import utils as auth_utils


class User(BaseClass):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None
    hashed_password: Optional[str] = None

    class Config:
        orm_mode = True

    class SqlTable(settings.base):
        __tablename__ = 'users'
        id = Column(Integer(), primary_key=True)
        username = Column(String())
        email = Column(String())
        full_name = Column(String())
        hashed_password = Column(String())

    @classmethod
    def get_user(cls, db: Session, username: str):
        user = db.query(cls.model()).filter(cls.model().username == username).first()
        if user:
            return cls.from_orm(user)

    @classmethod
    def authenticate_user(cls, db: Session, username: str, password: str):
        user = cls.get_user(db, username)
        if not user:
            return False
        if not auth_utils.verify_password(password, user.hashed_password):
            return False
        return user

    @classmethod
    def get_current_user(cls, db: Session, token: str):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate credentials',
            headers={'WWW-Authenticate': 'Bearer'}
        )
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, settings.ALGORITHM)
            username: str = payload.get('sub')
            if username is None:
                raise credentials_exception
            token_data = auth_utils.TokenData(username=username)
        except JWTError:
            raise credentials_exception
        user = cls.get_user(db, username=token_data.username)
        if user is None:
            raise credentials_exception
        return cls.from_orm(user)

    @classmethod
    def make_router(cls, db: Session, token: str):

        router = APIRouter()

        @router.get("/users/me/", response_model=cls)
        async def read_users_me(db: Session = db, token: str = token):
            user = cls.get_current_user(db, token)
            return get_current_active_user(user)

        # @router.get("/users/me/items/")
        # async def read_own_items(current_user: User = Depends(get_current_active_user)):
        #     return [{"item_id": "Foo", "owner": current_user.username}]

        @router.post("/token", response_model=auth_utils.Token)
        async def login_for_access_token(db: Session = db, form_data: OAuth2PasswordRequestForm = Depends()):
            user = cls.authenticate_user(db, form_data.username, form_data.password)
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Incorrect username or password",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = auth_utils.create_access_token(
                data={"sub": user.username}, expires_delta=access_token_expires
            )
            return {"access_token": access_token, "token_type": "bearer"}
        return router


async def get_current_active_user(current_user: User):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

