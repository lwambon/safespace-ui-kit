from fastapi import APIRouter
from pydantic import BaseModel
from langdetect import detect
from transformers import pipeline

# Load model once at startup
classifier = pipeline("text-classification", model="unitary/toxic-bert")

router = APIRouter()

class TextInput(BaseModel):
    text: str

@router.post("/ml/moderate")
def moderate_text(input: TextInput):
    language = detect(input.text)
    result = classifier(input.text)[0]
    return {
        "language": language,
        "label": result["label"],
        "confidence": round(result["score"], 4)
    }
