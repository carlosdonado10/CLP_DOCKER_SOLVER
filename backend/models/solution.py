from backend.models.base import BaseClass
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, relationship
from sqlalchemy import Column, Integer, DateTime, Float, String
from typing import List, Dict, Any
from datetime import datetime
from time import time


from backend.CLP_Algorithm.volume_maximization import volume_maximization
from backend.models.allocated_box import AllocatedBox
from backend.models.container import Container
from backend import settings


class Solution(BaseClass):
    name: str
    user_id: int
    timestamp: datetime
    utilization: float
    execution_time: float

    class SqlTable(settings.base):
        __tablename__ = 'solutions'
        id = Column(Integer(), primary_key=True)
        user_id = Column(Integer())
        name = Column(String())
        timestamp = Column(DateTime())
        utilization = Column(Float())
        execution_time = Column(Float())
        allocated_box = relationship(AllocatedBox.SqlTable, cascade='all, delete-orphan')

    @classmethod
    def add_solution(cls, name: str, utilization: float, execution_time: float, user_id: int, db: Session):
        return cls.new(db, False, **{
            'name': name,
            'user_id': user_id,
            'utilization': utilization,
            'timestamp': datetime.now(),
            'execution_time': execution_time
        })

    @classmethod
    def make_router(cls, db: Session) -> APIRouter:
        router = APIRouter()

        @router.get('/{user_id}')
        def get_solutons(user_id: int, db: Session = db, token: str = Depends(settings.oauth2_scheme)):
            return db.query(cls.model()).filter(cls.model().user_id == user_id).all()

        @router.post('/', response_model=Any)
        def optimize(payload: Dict[str, Any], db: Session = db, token: str = Depends(settings.oauth2_scheme)):
            try:
                boxes_params = payload.get('boxes')
                container_params = process_container_params(payload.get('container'))
                user_id = payload.get('user_id')
                t = time()
                allocated_list, utilization, _, _ = volume_maximization(boxes_params, container_params)
                execution_time = time() - t
                allocated_list = [box.params for box in allocated_list if box.params['type'] is not None]

                solution = cls.add_solution(name='ejemplo', execution_time=execution_time, utilization=utilization, user_id=user_id,db=db)
                for box in allocated_list:
                    AllocatedBox.new(db=db, autocommit=False, **parse_allocated_box(box, solution.id))

                container_params = payload.get('container')
                _ = container_params.pop('id')
                _ = container_params.pop('numBoxes')
                container_params['solution_id'] = solution.id
                Container.new(db=db, **container_params)

                return {'utilization': utilization}
            except Exception as e:
                raise e
        return router


def process_container_params(container_params):
    resp = container_params.copy()
    x2 = resp.pop('x')
    y2 = resp.pop('y')
    z2 = resp.pop('z')
    _ = resp.pop('numBoxes')
    _ = resp.pop('id')
    resp.update({'x1': 0, 'y1': 0, 'z1': 0, 'x2': x2, 'y2': y2, 'z2': z2})

    return resp


def parse_allocated_box(box: dict, solution_id: int):
    return {
        'solution_id': solution_id,
        'type': box['type'],
        'iteration': box['iteration'],
        'x1': box['x1'],
        'x2': box['x2'],
        'y1': box['y1'],
        'y2': box['y2'],
        'z1': box['z1'],
        'z2': box['z2'],
    }
