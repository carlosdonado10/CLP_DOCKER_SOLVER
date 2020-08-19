from abc import ABC, abstractmethod
from typing import Optional

from pydantic import BaseModel
from sqlalchemy.orm import Session


class BaseClass(BaseModel):
    id: Optional[int]

    class Config:
        orm_mode = True

    @classmethod
    def model(cls):
        return getattr(cls, 'SqlTable')

    @classmethod
    def new(cls, db: Session, **kwargs):
        """
        Creates a new entity and saves it in the database

        :param db: SQLAlchemy ORM database session
        :param kwargs: Fields as keyword arguments
        :return: The entity as saved into the database as a SQLAlchemy model
        """
        model = cls.model()(**kwargs)
        db.add(model)
        db.commit()
        db.refresh(model)
        return cls.from_orm(model)
