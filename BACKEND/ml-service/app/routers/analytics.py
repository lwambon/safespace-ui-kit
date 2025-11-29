from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class ModerationLog(BaseModel):
    text: str
    label: str
    confidence: float
    timestamp: datetime

# Temporary in-memory store
logs = []

@router.post("/ml/analytics")
def log_moderation(data: ModerationLog):
    logs.append(data)
    return {"message": "Log stored", "total_logs": len(logs)}

@router.get("/ml/analytics")
def get_logs():
    return {"logs": logs}
