# from dotenv import load_dotenv

from fastapi import FastAPI, Depends
from fastapi.responses import Response
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import os
import traceback


from backend import models
from backend.models import debugging
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

    # @app.middleware("http")
    # async def logging_middleware(request: Request, call_next, first=True):
    #     try:
    #         response: Response = await call_next(request)
    #     except Exception as e:
    #         response = Response(
    #             # Sends n-lines of Traceback in response message
    #             content=os.linesep.join(traceback.format_exc().splitlines()),
    #             media_type='text/plain',
    #             status_code=500
    #         )
    #
    #         # Prints traceback to container logs
    #         print(os.linesep.join(traceback.format_exc().splitlines()[-10:]))
    #     return response

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

    app.include_router(
        debugging.make_router(),
        prefix='/debugging'
    )

    app.mount("/", StaticFiles(directory=Path(__file__).parent / "build", html=True), name="frontend")

    return app


app = make_app()

if __name__ == '__main__':
    import uvicorn
    _ = settings.create_db()
    uvicorn.run(app)
