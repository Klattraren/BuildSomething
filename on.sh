#!/bin/bash
set -euo pipefail

FRONTEND_FILE="frontend/frontend.yaml"
BACKEND_FILE="backend/backend.yaml"
DATABASE_FILE="db/db.yaml"

echo "🔹 Starting Database..."
microk8s kubectl apply -f $DATABASE_FILE
microk8s kubectl rollout status deployment/postgres --timeout=2s
echo

echo "🔹 Starting Backend..."
microk8s kubectl apply -f $BACKEND_FILE
microk8s kubectl rollout status deployment/postgres --timeout=2s
echo

echo "🔹 Starting Frontend..."
microk8s kubectl apply -f $FRONTEND_FILE
microk8s kubectl rollout status deployment/postgres --timeout=2s
echo

echo "🔹 Starting Ingress..."
microk8s kubectl apply -f ingress.yaml
echo

echo "All services started successfully!"