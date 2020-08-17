from backend.database import Base

from sqlalchemy import Column, String, Integer
from pydantic import BaseModel, validator
import re


class User(BaseModel):
    id: int
    username: str
    email: str

    class SqlTable(Base):
        __tablename__ = 'users'
        id = Column(Integer(), primary_key=True, index=True)
        username = Column(String(), index=True, unique=True)
        email = Column(String(), index=True, unique=True)

    @validator('email')
    def email_formatting(cls, v):
        if not re.match(r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$', v):
            raise ValueError('Email is not formatted correctly')
