# Deploying SafeSpace backend on Render

This repository contains the backend and frontend for the SafeSpace project.

Quick steps to host the backend on Render and connect the frontend (on Render) to the backend:

1. Create a new **Web Service** on Render and select this repository.
2. Set the **Build Command** to: `npm run build`
3. Set the **Start Command** to: `npm run start`

This root package.json delegates to the `BACKEND` folder:
- `npm run build` runs `cd BACKEND && npm install` (no build step required for the Node backend)
- `npm run start` runs `cd BACKEND && npm start` (starts `server.js`)

Environment variables required by the backend (add to Render `Environment` section):
- `PORT` (optional — Render sets it automatically)
- `CORDS_ORIGIN` (optional — allow frontend origin)
- `DATABASE_URL` or PG connection variables
- `JWT_SECRET` and other auth secrets

If you host the frontend on Render, create a separate static site (or Node service). Then set the following environment variables:

- In the backend Render service:
	- `CORS_ORIGIN` = `https://safespace-frontend-vtfm.onrender.com` (or your frontend URL)
	- DB credentials: `DATABASE_URL` or `PGUSER`, `PGHOST`, `PGPASSWORD`, `PGDATABASE`, `PGPORT`
	- `JWT_SECRET` for token signing

- In the frontend Render service:
	- `VITE_API_NODE` = `https://<your-backend-service>.onrender.com` (the backend public URL)

These values align the two services and ensure the frontend can call the backend. Replace `<your-backend-service>` with your Render backend service name.

Advanced: If you prefer to build and deploy the frontend from this monorepo, use these scripts:
- `npm run build:frontend` to build the frontend
- `npm run start:frontend` to preview the frontend

For troubleshooting, check the Render logs and make sure `BACKEND/server.js` picks up `process.env.CORS_ORIGIN` or set it explicitly to your frontend URL.
