# Deployment Guide

This guide takes the project from a local Flask app to a professional deployment using Docker, Google Cloud Run, MongoDB Atlas, and GitHub Actions.

## 1. What You Are Building

Your deployment will work like this:

```text
GitHub repository
  -> GitHub Actions
  -> Docker image
  -> Google Cloud Run
  -> MongoDB Atlas
```

The browser still handles speech recognition and 3D animation. Flask handles pages, text processing, and history.

## 2. Accounts And Tools

Create or install these first:

- GitHub account
- Google Cloud account
- MongoDB Atlas account
- Docker Desktop
- Google Cloud CLI
- Git

## 3. Local Docker Test

Create a `.env` file locally with:

```env
MONGO_URI=your_mongodb_atlas_connection_string
```

Build the Docker image:

```bash
docker build -t sign-language-app .
```

Run it locally:

```bash
docker run --env-file .env -p 8080:8080 sign-language-app
```

Open:

```text
http://localhost:8080
```

Use Chrome or Edge for voice input. Browser speech features usually require HTTPS on hosted domains, but localhost is allowed for development.

## 4. Prepare Google Cloud

Login:

```bash
gcloud init
```

Set your project:

```bash
gcloud config set project YOUR_PROJECT_ID
```

Enable required APIs:

```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com secretmanager.googleapis.com
```

Create an Artifact Registry repository:

```bash
gcloud artifacts repositories create sign-language --repository-format=docker --location=asia-south1
```

Create the MongoDB secret:

```bash
echo "YOUR_MONGODB_ATLAS_URI" | gcloud secrets create mongo-uri --data-file=-
```

## 5. First Manual Deploy

Build and upload the container:

```bash
gcloud builds submit --tag asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/sign-language/sign-language-app
```

Deploy it:

```bash
gcloud run deploy sign-language-app --image asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/sign-language/sign-language-app --region asia-south1 --allow-unauthenticated --port 8080 --memory 1Gi --cpu 1 --set-secrets MONGO_URI=mongo-uri:latest
```

Cloud Run will print your HTTPS URL.

## 6. MongoDB Atlas Network Access

In MongoDB Atlas:

- Go to Network Access
- Add access for your deployed app
- For a beginner deployment, you can temporarily allow `0.0.0.0/0`
- For a stricter production setup later, use fixed outbound IP or private networking

## 7. GitHub Actions CI/CD

The workflow is already in:

```text
.github/workflows/deploy-cloud-run.yml
```

Add these GitHub repository secrets:

```text
GCP_PROJECT_ID
GCP_SERVICE_ACCOUNT_KEY
```

`GCP_SERVICE_ACCOUNT_KEY` is a Google Cloud service account JSON key with permission to build, push images, deploy Cloud Run, and read the MongoDB secret.

After that:

```bash
git add .
git commit -m "Add Docker and Cloud Run deployment"
git push origin main
```

Every push to `main` will build and deploy the app.

## 8. Custom Domain

After Cloud Run is working:

- Open Google Cloud Run
- Select `sign-language-app`
- Add a custom domain mapping
- Update DNS records at your domain provider

Once DNS is verified, your app will have HTTPS automatically.

## 9. Final Checklist

- Docker build works locally
- Docker run works locally
- MongoDB history save and load work locally
- Manual Cloud Run deploy works
- Hosted app opens on HTTPS
- Voice input works in Chrome or Edge
- GitHub Actions deploy succeeds
- Custom domain points to Cloud Run
