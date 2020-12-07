from fastapi import APIRouter, Depends
from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import Session

from backend import settings
from backend.models.base import BaseClass


class Container(BaseClass):
    solution_id: int
    type: str = 'Container'
    x: float
    y: float
    z: float

    class SqlTable(settings.base):
        __tablename__ = 'containers'
        id = Column(Integer(), primary_key=True)
        solution_id = Column(Integer(), ForeignKey('solutions.id'))
        x = Column(Float())
        y = Column(Float())
        z = Column(Float())

    @classmethod
    def make_router(cls, db: Session):

        router = APIRouter()

        @router.get('/{solution_id}')
        def get_container_by_solution_id(solution_id: int, db: Session = db, token: str = Depends(settings.oauth2_scheme)):
            return cls.from_orm(db.query(cls.model()).filter(cls.model().solution_id == solution_id).first())

        return router