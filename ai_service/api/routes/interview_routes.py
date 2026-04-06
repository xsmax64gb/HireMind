from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.interview_service import interview_service
from typing import List, Optional
from models.schemas import InterviewGenerateRequest, InterviewEvaluateRequest

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

@router.post("/mock/generate")
async def generate_mock_questions(request: InterviewGenerateRequest):
    questions = await interview_service.generate_mock_interview_questions(
        request.job_title,
        request.job_description,
        request.requirements
    )
    if not questions:
        raise HTTPException(status_code=500, detail="Failed to generate mock questions")
    return {"questions": questions}

@router.post("/mock/evaluate")
async def evaluate_mock_answer(request: InterviewEvaluateRequest):
    result = await interview_service.evaluate_mock_interview_answer(
        request.question,
        request.answer,
        request.job_title,
        request.job_description
    )
    return result

