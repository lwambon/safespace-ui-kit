from fastapi import APIRouter
from pydantic import BaseModel
from transformers import pipeline

chatbot = pipeline("text-generation", model="microsoft/DialoGPT-small")

router = APIRouter()

class ChatInput(BaseModel):
    message: str

@router.post("/ml/chatbot")
def chat_response(input: ChatInput):
    response = chatbot(input.message, max_length=100, pad_token_id=50256)[0]["generated_text"]
    return {"response": response}
