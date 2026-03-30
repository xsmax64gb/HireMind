from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

from api.routes import interview_routes, job_routes, cv_routes

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interview_routes.router, prefix=f"{settings.API_V1_STR}/interview", tags=["AI Interview"])
app.include_router(job_routes.router, prefix=f"{settings.API_V1_STR}/job", tags=["AI Job Processing"])
app.include_router(cv_routes.router, prefix=f"{settings.API_V1_STR}/cv", tags=["AI CV Processing"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
