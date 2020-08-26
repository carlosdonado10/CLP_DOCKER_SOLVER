from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

base = declarative_base()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_db():
    from sqlalchemy import create_engine

    # engine = create_engine('postgresql://postgres:postgres@db:5432/postgres')
    engine = create_engine('postgresql://postgres:postgres@localhost:54321/postgres')
    base.metadata.create_all(engine)
    session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    return session


def get_db():
    session = create_db()
    try:
        db = session()
        yield db
    finally:
        db.close()
