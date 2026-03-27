from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.interview_service import interview_service
from typing import List, Optional

router = APIRouter()

class GenerateQuestionsRequest(BaseModel):
    job_id: str
    job_title: str
    job_description: str
    requirements: Optional[str] = ""
    skills: Optional[List[str]] = None

@router.post("/generate-questions")
async def generate_questions(request: GenerateQuestionsRequest):
    questions = await interview_service.generate_questions(
        request.job_title, 
        request.job_description, 
        request.requirements,
        request.skills
    )
    
    if not questions:
        raise HTTPException(status_code=500, detail="Failed to generate questions")
    
    return {"job_id": request.job_id, "questions": questions}
