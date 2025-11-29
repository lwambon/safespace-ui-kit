from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import moderate, chatbot, emergency, analytics, education
app = FastAPI()

app.include_router(moderate.router)
app.include_router(chatbot.router)
app.include_router(emergency.router)
app.include_router(analytics.router)
app.include_router(education.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific domain if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ml/health")
def health_check(): 
    return {"status": "ok"}





