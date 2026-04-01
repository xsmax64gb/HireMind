from fastapi import APIRouter, HTTPException
from models.schemas import CVEmbedRequest, CVAnalysisRequest, CVRecommendationRequest
from services.chroma_service import chroma_service
from services.ai_service import ai_service

router = APIRouter()

@router.post("/embed")
async def embed_cv(request: CVEmbedRequest):
    metadata = {
        "user_id": request.user_id
    }
    
    success = chroma_service.add_cv(
        cv_id=request.cv_id,
        text=request.extracted_text,
        metadata=metadata
    )
    
    if success:
        return {"message": "CV embedded and stored successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to embed CV")

@router.delete("/{cv_id}")
async def delete_cv(cv_id: str):
    success = chroma_service.delete_cv(cv_id=cv_id)
    if success:
        return {"message": "CV deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to delete CV")

@router.post("/analyze")
async def analyze_cv(request: CVAnalysisRequest):
    try:
        result = await ai_service.analyze_cv_match(
            cv_text=request.cv_text,
            job_title=request.job_title,
            job_description=request.job_description,
            requirements=request.requirements
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend-jobs")
async def recommend_jobs(request: CVRecommendationRequest):
    try:
        results = chroma_service.query_similar_jobs(
            cv_id=request.cv_id,
            n_results=request.n_results
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
