from fastapi import APIRouter, HTTPException
from models.schemas import CVEmbedRequest
from services.chroma_service import chroma_service

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
