from fastapi import APIRouter
import os

def make_router():

    router = APIRouter()

    @router.get('environment')
    def environment():
        return os.environ

    return router
