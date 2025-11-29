# SafeSpace — Project Documentation

This single consolidated document explains how the SafeSpace project works, how to run it locally, how components interact, and where to find the commonly-used scripts.

Contents
- Overview
- How it works (Architecture & data flow)
- Technology stack
- Setup — Local dev
- Running & Testing
- Deployment notes
- Project structure
- Useful tips & troubleshooting

---

## Overview
SafeSpace is an AI-powered digital safety platform that combines a Vite React frontend, an Express/Node backend, a Python ML microservice, and a PostgreSQL database to detect, report, and respond to online harassment. This documentation consolidates the most important instructions and guides into a single file for readability.
 

## How it works (Architecture Overview)

1) The Frontend (Vite + React) serves a UI for users. It communicates with the Node.js backend via an API client (`apiClient.ts`), which automatically attaches JWT tokens for authenticated requests.
2) The Backend (Express) exposes REST endpoints for auth, analytics, moderation, reports, forum, hotspots, and emergency endpoints. It connects to a PostgreSQL database to read/write data and uses Socket.IO for real-time alerting.
3) The ML microservice (FastAPI) handles NLP tasks such as moderation and harassment detection; the backend calls it using the `ML_SERVICE_URL` environment variable.
4) PostgreSQL stores users, reports, forum posts, analytics logs, hotspots, and moderation queues.

Typical flow: User input → Frontend Service call → Backend API → DB and/or ML service → Response → Frontend update + socket events (if needed).

---

## Technology stack
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + Socket.IO
- Database: PostgreSQL
- ML: Python + FastAPI + Transformers (optional heavy dependency)
- Storage: Cloud/DB for images/evidence

---

## Setup — Local dev

Prerequisites: Node.js (v16+), Python (3.8+ if using ML service), PostgreSQL, npm (or bun if used by your environment), and git.

Backend
```powershell
cd BACKEND
npm ci
cp .env.example .env
# Edit .env to set DATABASE_URL or DB_HOST/DB_USER/DB_PASSWORD
npm run dev
```

ML microservice (optional)
```powershell
cd BACKEND/ml-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Frontend
```powershell
cd FRONTEND
npm ci
cp .env.example .env.local
# Set VITE_API_BASE_URL to backend URL
npm run dev
```

---

## Running & Testing

- Backend health: `GET /health` returns status.
- ML health: `GET /ml/health`.
- Frontend: open `http://localhost:5173` by default when using Vite.
- Use `npm run build` for production builds; `npm run test` for unit tests (if configured).

---

## Deployment notes

- Render is supported; steps earlier in the repository explain deploying backend, ML service, and frontend. Key environment variables: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_BASE_URL`, and `ML_SERVICE_URL`.
- If you host the ML service elsewhere (e.g., Hugging Face Inference), set `ML_SERVICE_URL` to the proper endpoint and remove heavy dependencies from the local ML service.

---

## Project Structure & Key files

- `BACKEND/`: Express server, controllers, routes, middleware, and db connection.
- `BACKEND/db/schema.sql` and `seeds.sql`: DB setup.
- `BACKEND/server.js`: main server entry point.
- `BACKEND/ml-service/`: FastAPI microservice for NLP/ML.
- `FRONTEND/`: Vite + React app with `src/` and `components/`.
- `FRONTEND/.env.local` and `BACKEND/.env` provide env configs.

---

## Useful tips & troubleshooting

- CORS: Set `CORS_ORIGIN` to your frontend URL to avoid issues.
- DB SSL: When using a remote `DATABASE_URL`, enable `ssl` in the connection config if needed.
- Environment variables: Frontend `VITE_` prefixed variables are inlined into the build.
- ML service costs and memory: If using `transformers` + `torch`, expect large memory requirements; use hosted inference for production.

---

If you need a file or section restored that was removed, please ask — archives are stored under `docs/archives`.

---
Last updated: 2025-11-29
