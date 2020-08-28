from typing import List
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, Float, ForeignKey
import pandas as pd
from scipy import stats

from backend.models.base import BaseClass
from backend import settings
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
        def get_by_scenario_id(solution_id: int, db: Session = db, token: str = Depends(settings.oauth2_scheme)):
            return [cls.from_orm(box) for box in db.query(cls.model()).filter(cls.model().solution_id == solution_id).all()]

        @router.get('/summary/{solution_id}')
        def get_summary(solution_id: int, db:Session = db, token: str = Depends(settings.oauth2_scheme)):
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

            number_by_type = allocated_boxes.groupby('type')
            number_by_type = number_by_type.agg({
                'color': stats.mode,
            })

            number_by_type = pd.DataFrame(parse_list(number_by_type['color'].tolist()), index=number_by_type.index).reset_index()

            df_compare = pd.merge(number_by_type, requested_boxes, left_on='type', right_on='name', how='right').loc[:, ['name', 'numBoxes', 1, 0]]
            df_compare.columns = ['name', 'requested', 'allocated', 'color']
            df_compare['requested'] = df_compare['requested'].fillna(0)
            df_compare['color'] = df_compare['color'].fillna(pd.Series([hex_to_rgb('#FFFFFF')]*df_compare.shape[0], index=df_compare.index))
            df_compare.fillna(0, inplace=True)


            return df_compare.to_dict(orient='records')

        return router


def parse_list(list):
    ret = []
    for element in list:
        try:
            ret.append([hex_to_rgb(element.mode[0]), element.count[0]])
        except:
            ret.append([hex_to_rgb('#FFFFFF'), None])
    return ret


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
