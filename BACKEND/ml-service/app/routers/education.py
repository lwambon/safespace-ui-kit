from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class TopicRequest(BaseModel):
    topic: str

EDUCATION_CONTENT = {
    "harassment": "Digital harassment includes repeated, unwanted contact, threats, or abusive language online. Always document incidents and report them to platform moderators or authorities.",
    "privacy": "Protect your identity by using strong passwords, avoiding oversharing, and enabling two-factor authentication.",
    "reporting": "Most platforms have built-in tools to report abuse. Use screenshots and timestamps when filing a report.",
    "response": "If you receive toxic messages, avoid engaging. Block the sender and seek support from trusted contacts or helplines."
}

@router.post("/ml/education")
def get_education(input: TopicRequest):
    key = input.topic.lower()
    content = EDUCATION_CONTENT.get(key, "Topic not found. Try 'harassment', 'privacy', 'reporting', or 'response'.")
    return {"topic": input.topic, "content": content}
