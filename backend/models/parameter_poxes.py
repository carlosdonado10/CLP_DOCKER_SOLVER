from sqlalchemy.orm import Session

from backend.models.base import BaseClass
from backend import settings
from sqlalchemy import Column, Integer, String, Float


class ParameterBox(BaseClass):
    solution_id: int
    name: str
    x: float
    y: float
    z: float
    numBoxes: int

    class SqlTable(settings.base):
        __tablename__ = "parameter_boxes"
        id = Column(Integer(), primary_key=True)
        solution_id = Column(Integer())
        name = Column(String())
        x = Column(Float())
        y = Column(Float())
        z = Column(Float())
        numBoxes = Column(Integer())

    @classmethod
    def add_box(cls, db: Session, payload: dict):
        return cls.new(db, **payload)
