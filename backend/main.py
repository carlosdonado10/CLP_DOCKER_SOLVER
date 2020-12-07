# from dotenv import load_dotenv

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path


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

    app.include_router(
        models.Solution.make_router(
            Depends(settings.get_db)
        ),
        prefix='/solution'
    )

    app.include_router(
        models.AllocatedBox.make_router(
            Depends(settings.get_db)
        ),
        prefix='/allocatedBox'
    )

    app.include_router(
        models.Container.make_router(
            Depends(settings.get_db)
        ),
        prefix='/Container'
    )

    app.mount("/", StaticFiles(directory=Path(__file__).parent / "static", html=True), name="frontend")

    return app




app = make_app()

if __name__ == '__main__':
    import uvicorn
    _ = settings.create_db()
    uvicorn.run(app)
