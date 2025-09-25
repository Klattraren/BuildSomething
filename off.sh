#!/bin/bash
set -euo pipefail

echo "Shutting down services..."
microk8s kubectl delete all --all
microk8s kubectl delete ingress --all