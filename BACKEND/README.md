 AI MICROSERVICE
Hackathon Project – November 2025
Built by Sylvia Karanja and Cynthia Mueni

🚀 OVERVIEW
SafeSpace is an AI-powered backend microservice designed to detect digital harassment, support users in distress, and provide safety resources. It exposes modular FastAPI endpoints for moderation, chatbot support, emergency contacts, educational modules, and analytics logging — enabling seamless integration with frontend and Node.js backends.
🧠 Features
- Toxicity Detection (/ml/moderate)
Classifies harmful or abusive language using NLP models.
- Support Chatbot (/ml/chatbot)
Responds empathetically to user messages with safety guidance.
- Emergency Services (/ml/emergency)
Returns location-based emergency contacts.
- Safety Education (/ml/education)
Provides educational content on digital safety topics.
- Analytics Logging (/ml/analytics)
Logs moderation results and retrieves analytics history.
- Health Check (/ml/health)
Confirms service availability.

🧱 TECH STACK
- FastAPI – Python web framework
- Uvicorn – ASGI server
- Annotated-doc – NLP model integration
- Axios – Used by Node.js backend to consume endpoints
- GitHub – Version control and collaboration

📁 FOLDER STRUCTURE by (Sylvia Karanja)
ml-service/
├── app/
│   ├── routers/
│   │   ├── moderate.py
│   │   ├── chatbot.py
│   │   ├── emergency.py
│   │   ├── education.py
│   │   ├── analytics.py
│   ├── main.py
│   ├── models/
│   ├── utils/
├── .env
├── requirements.txt

REQUIREMENTS
The following Python packages are required to run the microservice:
annotated-doc==0.0.4
fastapi
uvicorn
pydantic

 Node.js BACKEND INTEGRATION (by Cynthia Mueni)
backend/
├── routes/
│   ├── analytics.js
│   ├── chatbot.js
│   ├── education.js
│   ├── emergency.js
│   ├── moderate.js
├── services/
│   ├── aiService.js   # Axios wrapper for FastAPI endpoints
├── server.js          # Express app entry point
├── package.json

🧪 HOW THEY CONNECT
- Sylvia’s FastAPI service runs on http://localhost:8000/ml/... and exposes AI-powered endpoints.
- Cynthia’s Node.js backend uses Axios (aiService.js) to call those endpoints and re-expose them as /api/... routes for the frontend.
- Together, they form a modular, full-stack safety system: Python for AI logic, Node.js for integration and frontend readiness.




🧪 INSTALLATION AND SETUP
- Clone the repository
 
git clone https://github.com/Sylvia-Kui/BACKEND.git
cd BACKEND/ml-service
- Create a virtual environment

  python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

- Install dependencies
  
pip install -r requirements.txt

- Run the FastAPI server
  
uvicorn app.main:app --reload --port 8000

🔗 Node,js INTEGRATION (by Cynthia Mueni)
The Node.js backend consumes the FastAPI microservice using Axios. Cynthia implemented:
- Axios service layer (aiService.js)
Wraps all FastAPI endpoints for easy reuse in controllers.
- Backend routes and controllers
Exposes endpoints like /api/moderate, /api/chatbot, etc., for frontend access.
- Integration testing
Verified connectivity using curl, test scripts, and console logging.
- Frontend-ready responses
Ensures JSON responses are clean and structured for UI consumption.

🧪 HOW TO TEST Node.js INTEGRATION
- Run FastAPI server
uvicorn app.main:app --reload --port 8000
- Run Node.js backend
node server.js
- Test endpoints via browser or Postman
- http://localhost:3000/api/health
- http://localhost:3000/api/moderate
  

🧪 HOW TO RUN LOCALLY
# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8000 --app-dir ml-service


🛠️ OUR PROCESS
We started by sketching out the API contract and dividing responsibilities. Sylvia focused on model integration and endpoint design, while Cynthia ensured seamless connectivity and frontend readiness. We tested each endpoint using curl, console logs, and browser routes — refining responses and fixing edge cases together.
💡 WHAT WE LEARNED
- How to rapidly prototype a full-stack AI system under pressure
- How to collaborate across frameworks (Python + Node.js)
- How to structure clean, scalable backend code for real-world use
❤️ WHY IT MATTERS
  This isn’t just a technical project — it’s a statement. We believe everyone deserves to feel safe online. This microservice is our contribution to that vision: fast, modular, and ready to be integrated into any platform that wants to protect its users.





