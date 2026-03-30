from fastapi import APIRouter, HTTPException
from models.schemas import JobEmbedRequest
from services.chroma_service import chroma_service

router = APIRouter()

@router.post("/embed")
async def embed_job(request: JobEmbedRequest):
    combined_text = f"Title: {request.job_title}\nDescription: {request.job_description}\nRequirements: {request.requirements}"
    metadata = {
        "job_title": request.job_title,
        "recruiter_id": request.recruiter_id
    }
    
    success = chroma_service.add_job(
        job_id=request.job_id,
        text=combined_text,
        metadata=metadata
    )
    
    if success:
        return {"message": "Job embedded and stored successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to embed job")

@router.delete("/{job_id}")
async def delete_job(job_id: str):
    """
    Delete a job from Chroma using its job_id.
    """
    success = chroma_service.delete_job(job_id=job_id)
    
    if success:
        return {"message": "Job deleted from Chroma successfully"}
    else:
        # We use status_code 404/500 depending on use case. 
        # For simple sync, we'll return 500 if the call itself fails.
        raise HTTPException(status_code=500, detail="Failed to delete job from Chroma")
