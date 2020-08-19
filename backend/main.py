import os
# from dotenv import load_dotenv

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend import models
from backend import settings

# load_dotenv()


def make_app():

    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(
        models.User.make_router(
            Depends(settings.get_db),
            Depends(settings.oauth2_scheme)
        )
    )

    return app




app = make_app()

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app)
