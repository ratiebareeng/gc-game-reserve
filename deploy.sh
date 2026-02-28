#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${1:?Usage: ./deploy.sh <gcp-project-id>}"
REGION="africa-south1"
SERVICE="gaborone-reserve-api"
REPO="gaborone-reserve"
IMAGE="$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/api"

echo "==> Building Docker image..."
docker build -t "$IMAGE:latest" .

echo "==> Pushing to Artifact Registry..."
docker push "$IMAGE:latest"

echo "==> Deploying to Cloud Run ($REGION)..."
gcloud run deploy "$SERVICE" \
  --image "$IMAGE:latest" \
  --region "$REGION" \
  --platform managed \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 3 \
  --allow-unauthenticated

echo "==> Done! Service URL:"
gcloud run services describe "$SERVICE" --region "$REGION" --format 'value(status.url)'
