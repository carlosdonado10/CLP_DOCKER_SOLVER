from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Column, String, Integer, Boolean
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
    password: Optional[str] = None

    class Config:
        orm_mode = True

    class SqlTable(settings.base):
        __tablename__ = 'users'
        id = Column(Integer(), primary_key=True)
        username = Column(String())
        email = Column(String())
        full_name = Column(String())
        disabled = Column(Boolean())
        hashed_password = Column(String())

    @classmethod
    def make_router(cls, db: Session, token: str):

        router = APIRouter()

        @router.get("/users/me/", response_model=cls)
        async def read_users_me(db: Session = db):
            return db.query(User.SqlTable).first()

        @router.post("/users/")
        async def add_user(payload: User, db: Session = db):
            payload = payload.dict()
            pswrd = payload.pop('password')
            payload['hashed_password'] = auth_utils.get_password_hash(pswrd)

            return cls.new(db, **payload)

        # @router.get("/users/me/items/")
        # async def read_own_items(current_user: User = Depends(get_current_active_user)):
        #     return [{"item_id": "Foo", "owner": current_user.username}]

        @router.post("/token", response_model=auth_utils.Token)
        async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = db):
            user = authenticate_user(db, form_data.username, form_data.password)
            if not user:
                raise HTTPException(
                    status_code=status  .HTTP_401_UNAUTHORIZED,
                    detail="Incorrect username or password",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            access_token_expires = timedelta(days=1)  # USE MINUTES FROM SETTINGS
            access_token = auth_utils.create_access_token(
                data={"sub": user.username}, expires_delta=access_token_expires
            )
            return {"access_token": access_token, "token_type": "bearer"}
        return router


def authenticate_user(db: Session, username: str, password: str):
    print('llego')
    user = get_user(db, username)
    if not user:
        return False
    if not auth_utils.verify_password(password, user.hashed_password):
        return False
    return user


def get_user(db: Session, username: str):
    user = db.query(User.model()).filter(User.model().username == username).first()
    if user:
        return User.from_orm(user)


async def get_current_user(db: Session = Depends(settings.get_db), token: str = Depends(settings.oauth2_scheme)) -> User:
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
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return User.from_orm(user)


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

