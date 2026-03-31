from pydantic import BaseModel
from typing import Optional

class JobEmbedRequest(BaseModel):
    job_id: str
    job_title: str
    job_description: str
    requirements: Optional[str] = ""
    recruiter_id: str

class CVEmbedRequest(BaseModel):
    cv_id: str
    user_id: str
    extracted_text: str

class CVAnalysisRequest(BaseModel):
    cv_text: str
    job_title: str
    job_description: str
    requirements: Optional[str] = ""
