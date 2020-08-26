from typing import List

from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session

from backend.models.base import BaseClass
from backend import settings
from sqlalchemy import Column, Integer, String, Float, ForeignKey

class AllocatedBox(BaseClass):
    solution_id: int
    iteration: int
    type: str
    x1: float
    x2: float
    y1: float
    y2: float
    z1: float
    z2: float

    class SqlTable(settings.base):
        __tablename__ = "allocated_boxes"
        id = Column(Integer(), primary_key=True)
        solution_id = Column(Integer(), ForeignKey('solutions.id'))
        iteration = Column(Integer())
        type = Column(String())
        x1 = Column(Float())
        x2 = Column(Float())
        y1 = Column(Float())
        y2 = Column(Float())
        z1 = Column(Float())
        z2 = Column(Float())

    @classmethod
    def add_box(cls, db: Session, payload: dict):
        return cls.new(db, **payload)

    @classmethod
    def make_router(cls, db: Session):

        router = APIRouter()

        @router.get('/{solution_id}', response_model=List[cls])
        def get_by_scenario_id(solution_id: int, db: Session = db, token: str = Depends(settings.oauth2_scheme)):
            return [cls.from_orm(box) for box in db.query(cls.model()).filter(cls.model().solution_id == solution_id).all()]

        return router
