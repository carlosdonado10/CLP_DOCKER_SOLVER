from typing import List

import pandas as pd
from fastapi import Depends, APIRouter
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import Session
from statistics import mode

from backend import settings
from backend.models.base import BaseClass
from backend.models.parameter_poxes import ParameterBox


class AllocatedBox(BaseClass):
    solution_id: int
    iteration: int
    type: str
    color: str
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
        color = Column(String())
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
        def get_by_scenario_id(solution_id: int, db: Session = db):
            return [cls.from_orm(box) for box in db.query(cls.model()).filter(cls.model().solution_id == solution_id).all()]

        @router.get('/summary/{solution_id}')
        def get_summary(solution_id: int, db:Session = db):
            allocated_boxes = pd.DataFrame(
                [
                    cls.from_orm(box).dict()
                    for box in  db.query(cls.model()).filter(cls.model().solution_id==solution_id).all()
                ]
            )
            requested_boxes = pd.DataFrame(
                [
                    ParameterBox.from_orm(box).dict()
                    for box in db.query(ParameterBox.model()).filter(ParameterBox.model().solution_id == solution_id).all()
                ]
            )

            allocated_number_by_type = allocated_boxes['color'].value_counts().reset_index()
            allocated_number_by_type.index = requested_boxes['name'].values
            allocated_number_by_type.columns = ['color', 'allocated']
            requested_number_by_type = pd.DataFrame(requested_boxes['numBoxes'].values, index=requested_boxes['name'].values, columns=['requested'])
            allocated_number_by_type['requested'] = requested_number_by_type['requested']

            return to_rgb(allocated_number_by_type).to_dict(orient='records')

        return router


def to_rgb(df: pd.DataFrame) -> pd.DataFrame:
    color = []

    for row in df.itertuples():
        color.append(hex_to_rgb(row.color))

    df['color'] = color
    return df




def hex_to_rgb(value):
    value = value.lstrip('#')
    lv = len(value)
    rgb = [int(value[i:i + lv // 3], 16) for i in range(0, lv, lv // 3)]
    return {
        'rgb':{
            'r': rgb[0],
            'g': rgb[1],
            'b': rgb[2],
            'a': 1
        }
    }
