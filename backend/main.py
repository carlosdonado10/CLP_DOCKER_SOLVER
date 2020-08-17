import os
from dotenv import load_dotenv

from fastapi import FastAPI, Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.database import Base

load_dotenv()


def make_app(engine):

    session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    def get_db():
        db = None
        try:
            db = session()
            yield db
        finally:
            db.close()

    app = FastAPI()


def main():
    from sqlalchemy import create_engine

    engine = create_engine(os.getenv('POSTGRES_CONNECTION_STRING_DEBUG'))
    Base.metadata.create_all(engine)
    return make_app(engine)


app = main()

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)