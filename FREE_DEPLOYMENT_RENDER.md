# Free Deployment Guide: Render

This guide is for deploying the project without paying for Google Cloud.

The recommended free path is:

```text
GitHub repository
  -> Render Free Web Service
  -> Dockerfile build
  -> MongoDB Atlas
```

Render provides free web services for hobby/testing projects. Free services have limitations, but they are suitable for an academic portfolio demo.

## 1. Why Render Instead Of Google Cloud Run

Google Cloud Run is professional, but it requires a Google Cloud billing account.

For a zero-rupee academic project, Render Free is simpler:

- No Kubernetes needed
- Dockerfile still used
- HTTPS URL included
- Auto-deploy from GitHub included
- Environment variables supported
- Custom domains supported on free web services

Important limitation:

- Free services spin down after inactivity
- The first request after sleeping can take around a minute
- Free services have limited RAM and CPU

## 2. Files Used For Render

### `Dockerfile`

Render will use this file to build and run the app.

The app starts with:

```bash
gunicorn --bind 0.0.0.0:${PORT:-8080} --workers ${WEB_CONCURRENCY:-1} --threads ${GUNICORN_THREADS:-2} --timeout 120 app:app
```

The default is one Gunicorn worker because the free instance has limited memory and the spaCy model should not be loaded multiple times.

### `render.yaml`

This file describes the Render service:

```yaml
services:
  - type: web
    name: sign-language-app
    runtime: docker
    plan: free
    autoDeploy: true
```

It also defines these environment variables:

```text
MONGO_URI
WEB_CONCURRENCY=1
GUNICORN_THREADS=2
```

`MONGO_URI` is marked as `sync: false`, so the real value must be entered securely in the Render dashboard.

## 3. Before Deploying

Make sure these are done:

- Docker works locally
- App opens at `http://localhost:8080`
- MongoDB Atlas save/read works locally
- `.env` is not committed
- Code is pushed to GitHub

## 4. Push Code To GitHub

If your project is not already on GitHub:

```bash
git add .
git commit -m "Add Docker and Render deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

If the GitHub remote already exists:

```bash
git add .
git commit -m "Add Docker and Render deployment"
git push origin main
```

## 5. Create Render Service

1. Go to Render:

```text
https://render.com
```

2. Sign in with GitHub.

3. Click `New`.

4. Choose `Web Service`.

5. Select your GitHub repository.

6. Render should detect the `Dockerfile`.

7. Choose the `Free` instance type.

8. Add environment variable:

```text
Key: MONGO_URI
Value: your real MongoDB Atlas URI
```

9. Click `Create Web Service`.

Render will build and deploy the app.

## 6. MongoDB Atlas Network Access

Render uses cloud servers, so MongoDB Atlas must allow the Render app to connect.

Beginner option:

```text
Allow access from anywhere: 0.0.0.0/0
```

Use a strong database user password if you choose this.

More strict option:

- Use a provider with fixed outbound IP
- Or upgrade later to a paid networking setup

For this academic portfolio deployment, `0.0.0.0/0` with a dedicated low-permission database user is acceptable.

Recommended database user role:

```text
readWrite on database: history
```

## 7. Test The Hosted App

After deployment, Render gives you a URL like:

```text
https://sign-language-app.onrender.com
```

Test:

- Homepage loads
- Text input works
- Voice input works in Chrome or Edge
- Save history works
- View history works
- Delete history works

## 8. CI/CD Behavior

Render gives you simple CI/CD automatically.

Every push to your connected branch triggers:

```text
GitHub push
  -> Render build
  -> Docker image build
  -> Deploy new version
```

This is enough for a professional portfolio project.

The existing GitHub Actions Cloud Run workflow is optional and can remain in the repo for future paid cloud deployment.

## 9. Portfolio Explanation

You can describe your deployment like this:

```text
The application is containerized with Docker and deployed using Render's managed web service platform. CI/CD is handled through GitHub auto-deploys. Secrets are managed through environment variables, and MongoDB Atlas is used as the hosted database.
```

This sounds professional and is accurate.

## 10. Free Tier Limitations To Mention Honestly

Render Free is not production-grade.

For a portfolio demo, the main limitations are:

- App may sleep after inactivity
- First request after sleep may be slow
- RAM is limited
- No horizontal scaling
- Not suitable for high-traffic production use

That is fine for an academic/portfolio project.
