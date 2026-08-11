# Deployment Implementation Notes

This document explains what was added or changed to prepare this Flask project for professional hosting with Docker, Google Cloud Run, MongoDB Atlas, and GitHub Actions CI/CD.

No secret values are stored in this document.

## 1. Starting Point

The project was originally a local Flask app started with:

```bash
python app.py
```

The app contains:

- Flask backend in `app.py`
- HTML templates in `templates/`
- CSS and JavaScript in `static/`
- 3D avatar models in `static/Models/`
- Sign animation modules in `static/Animations/`
- MongoDB Atlas history storage using `MONGO_URI`
- spaCy and NLTK for NLP text processing

The local app used Flask's development server:

```python
if __name__ == '__main__':
    app.run(debug=True)
```

That is fine for localhost, but not for production hosting.

## 2. Files Created

The following files were created.

### `Dockerfile`

Purpose: package the Flask app, Python dependencies, spaCy model, NLTK data, templates, and static files into one deployable container.

Important behavior:

- Uses `python:3.11-slim`
- Sets `/app` as the working directory
- Installs dependencies from `requirements.txt`
- Downloads required NLTK data during image build
- Copies the project files into the container
- Exposes port `8080`
- Starts the app using Gunicorn

Production start command:

```bash
gunicorn --bind 0.0.0.0:${PORT:-8080} --workers 2 --threads 4 --timeout 120 app:app
```

Why this matters:

- Cloud Run expects the app to listen on the provided `PORT`
- Gunicorn is production-ready
- Flask's debug server is avoided in production

### `.dockerignore`

Purpose: keep unnecessary or sensitive files out of the Docker image.

Excluded items include:

- `.git`
- `.github`
- `.venv`
- `.env`
- `node_modules`
- `__pycache__`
- local editor files
- old unpacked local spaCy model folder `en_core_web_sm-3.4.0`

Why this matters:

- Makes the Docker image smaller
- Prevents secrets from being copied into the image
- Avoids shipping local development folders

### `.github/workflows/deploy-cloud-run.yml`

Purpose: provide a CI/CD pipeline for automatic deployment to Google Cloud Run.

Current trigger:

```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
```

This means:

- Every push to `main` can deploy the app
- You can also manually run the workflow from GitHub Actions

Pipeline steps:

- Checkout repository code
- Authenticate to Google Cloud
- Set up `gcloud`
- Configure Docker authentication for Artifact Registry
- Build Docker image
- Push Docker image to Artifact Registry
- Deploy image to Cloud Run
- Print deployed URL

Required GitHub secrets:

```text
GCP_PROJECT_ID
GCP_SERVICE_ACCOUNT_KEY
```

Cloud Run service settings in the workflow:

```text
Service: sign-language-app
Region: asia-south1
Port: 8080
Memory: 1Gi
CPU: 1
Secret: MONGO_URI=mongo-uri:latest
```

Why this matters:

- Deployment becomes repeatable
- You do not manually upload files
- Secrets stay outside the code
- Every production deployment comes from GitHub

### `DEPLOYMENT_GUIDE.md`

Purpose: beginner-friendly step-by-step deployment guide.

It explains:

- Required accounts and tools
- Local Docker build
- Local Docker run
- Google Cloud setup
- Artifact Registry setup
- Secret Manager setup
- Manual Cloud Run deployment
- MongoDB Atlas network access
- GitHub Actions CI/CD setup
- Custom domain setup
- Final deployment checklist

### `.env.example`

Purpose: show the correct environment variable format without storing real secrets.

Example:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER_NAME.mongodb.net/?retryWrites=true&w=majority
```

Why this matters:

- New developers know what environment variable is required
- The real `.env` file remains private

### `IMPLEMENTATION_NOTES.md`

Purpose: this file. It records what was changed and why.

## 3. Files Modified

The following existing files were modified.

### `requirements.txt`

Added:

```txt
gunicorn==23.0.0
```

Why:

- Gunicorn is the production server used inside Docker and Cloud Run
- Flask's built-in development server should not be used for hosted production apps

### `static/script.js`

Fixed dynamic import paths for Linux hosting.

Before:

```js
./Animations/alphabets/${char}.js
./Animations/words/${word.toLowerCase()}.js
./Animations/numbers/${num}.js
```

After:

```js
./Animations/Alphabets/${char}.js
./Animations/Words/${word.toUpperCase()}.js
./Animations/Numbers/${num}.js
```

Why:

- Windows localhost is case-insensitive
- Linux hosting is case-sensitive
- The real folders are named `Alphabets`, `Words`, and `Numbers`
- Without this fix, animations could work locally but fail after deployment

### `templates/index.html`

Removed references to missing files:

```html
tab-switching.css
tab-switching.js
```

Why:

- These files do not exist in `static/`
- Missing static files can produce unnecessary 404 errors in production
- The tab switching logic already exists in `static/script.js`

## 4. Docker Setup

The Docker setup makes the project run the same way across machines and cloud hosting.

Build command:

```bash
docker build -t sign-language-app .
```

Run command with environment variables:

```bash
docker run --rm -d --env-file .env -p 8080:8080 --name sign-language-local-test sign-language-app
```

Open locally:

```text
http://localhost:8080
```

Stop the local container:

```bash
docker stop sign-language-local-test
```

## 5. MongoDB Atlas Setup

The app reads the MongoDB connection string from:

```python
MONGO_URI = os.getenv("MONGO_URI")
```

The real value belongs in `.env` locally:

```env
MONGO_URI=your_real_mongodb_atlas_uri
```

The app uses:

```python
db = client['history']
histories_collection = db['histories']
```

So the MongoDB target is:

```text
Database: history
Collection: histories
```

A new MongoDB Atlas database user was recommended because the old collection creator does not matter. Any user with `readWrite` permission on the `history` database can use the existing `histories` collection.

## 6. Local Verification Completed

The Docker image was built successfully:

```text
docker build -t sign-language-app .
```

The container was started successfully:

```text
sign-language-local-test
```

The homepage was tested:

```text
GET http://localhost:8080/
Result: 200 OK
Server: gunicorn
```

The text processing endpoint was tested:

```text
POST /save_text
Input: I am going home
Output: I go home
Result: success
```

The MongoDB history save endpoint was tested after fixing the Atlas credentials:

```text
POST /save_history
Result: History saved successfully
Inserted ID: 6a7af22bf977bec736ef7865
```

The MongoDB history fetch endpoint was tested:

```text
GET /get_history
Result: existing records returned from MongoDB Atlas
```

Final local status:

```text
Docker image: working
Flask app inside Docker: working
MongoDB Atlas connection: working
History save: working
History fetch: working
```

## 7. CI/CD Setup

The CI/CD file is located at:

```text
.github/workflows/deploy-cloud-run.yml
```

What it will do after GitHub and Google Cloud are configured:

```text
Push to main
  -> GitHub Actions starts
  -> Docker image is built
  -> Docker image is pushed to Google Artifact Registry
  -> Cloud Run service is updated
```

Before using CI/CD, these cloud resources must exist:

- Google Cloud project
- Artifact Registry repository named `sign-language`
- Cloud Run API enabled
- Artifact Registry API enabled
- Secret Manager API enabled
- Secret named `mongo-uri`
- Service account JSON key stored in GitHub as `GCP_SERVICE_ACCOUNT_KEY`
- Google Cloud project ID stored in GitHub as `GCP_PROJECT_ID`

## 8. Current Next Steps

The next deployment phase is Google Cloud Run.

Recommended order:

1. Install Google Cloud CLI
2. Run `gcloud init`
3. Enable required Google Cloud APIs
4. Create Artifact Registry repository
5. Store MongoDB URI in Secret Manager
6. Deploy manually to Cloud Run once
7. Test the hosted HTTPS URL
8. Connect GitHub Actions CI/CD
9. Add custom domain

## 9. Important Notes

Do not commit `.env`.

The `.env` file contains your real MongoDB credentials and must stay local.

Use `.env.example` only as a public template.

The app's browser speech feature should be tested in Chrome or Edge. On real hosted domains, HTTPS is required for browser microphone/speech features.

Kubernetes is not needed for this project right now. Docker plus Cloud Run is the professional path.
