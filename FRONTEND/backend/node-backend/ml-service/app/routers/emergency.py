from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LocationInput(BaseModel):
    location: str

# Sample static data — you can later connect to a real API or database
EMERGENCY_CONTACTS = {
    "kenya": {
        "police": "999 or 112",
        "gender-based violence helpline": "1195",
        "childline": "116"
    },
    "usa": {
        "police": "911",
        "domestic violence": "1-800-799-7233",
        "mental health": "988"
    }
}

@router.post("/ml/emergency")
def get_contacts(input: LocationInput):
    key = input.location.lower()
    contacts = EMERGENCY_CONTACTS.get(key, {})
    return {"location": input.location, "contacts": contacts}
