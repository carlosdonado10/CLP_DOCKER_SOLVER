import os
# from dotenv import load_dotenv

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.database import Base
from backend import models
from backend import settings

# load_dotenv()

def make_app(engine):

    session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    def get_db():
        db = None
        try:
            db = session()
            yield db
        finally:
            db.close()

    def get_token():
        yield settings.oauth2_scheme

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
            Depends(get_db),
            Depends(get_token)
        ),
        prefix='/user'
    )

    @app.get('/items/')
    async def read_items(token: str = Depends(settings.oauth2_scheme)):
        print(token)
        return {'a': token}

    return app


def main():
    from sqlalchemy import create_engine

    engine = create_engine('postgresql://postgres:postgres@db:5432/postgres')
    Base.metadata.create_all(engine)
    return make_app(engine)


def main_debug():
    from sqlalchemy import create_engine

    engine = create_engine('postgresql://postgres:postgres@localhost:54321/postgres')
    Base.metadata.create_all(engine)
    return make_app(engine)


# app = main()

if __name__ == '__main__':
    import uvicorn
    debug_app = main_debug()
    uvicorn.run(debug_app)
