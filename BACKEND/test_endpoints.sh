#!/bin/bash

echo "=== Health Check ==="
curl http://localhost:8000/health
echo -e "\n"

echo "=== Moderation (Forum Example) ==="
curl -X POST http://localhost:8000/api/forum \
  -H "Content-Type: application/json" \
  -d '{"content":"You are so stupid and annoying"}'
echo -e "\n"

echo "=== Chatbot ==="
curl -X POST http://localhost:8000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message":"I feel unsafe online"}'
echo -e "\n"

echo "=== Emergency ==="
curl "http://localhost:8000/api/emergency?country=Kenya"
echo -e "\n"

echo "=== Analytics Log ==="
curl -X POST http://localhost:8000/api/analytics \
  -H "Content-Type: application/json" \
  -d '{"text":"test message","label":"toxic","confidence":0.9,"timestamp":"2025-11-28T18:05:00"}'
echo -e "\n"

echo "=== Analytics View ==="
curl http://localhost:8000/api/analytics
echo -e "\n"
