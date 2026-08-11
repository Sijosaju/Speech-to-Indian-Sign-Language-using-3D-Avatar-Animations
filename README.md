<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=30&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=Speech+to+ISL+Translator;Bridging+Communication+Gaps;English+%E2%86%92+Indian+Sign+Language" alt="Typing SVG" />

# 🤟 Speech to Indian Sign Language Translator

### *Giving voice to hands — translating spoken English into animated Indian Sign Language using AI and 3D avatars*

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Railway-blueviolet?style=for-the-badge)](https://speech2sign.up.railway.app/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/atlas)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Avatar-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)

</div>

---

## 🌟 What Is This?

Over **63 million people** in India are members of the Deaf and hard-of-hearing community. Most digital content remains inaccessible to them. This project bridges that gap — it takes **spoken or typed English**, converts it into **ISL grammar structure**, and brings it to life through a **real-time animated 3D avatar** performing the corresponding signs.

> Built as a mini project to demonstrate the practical intersection of NLP, 3D animation, full-stack development, and accessibility technology.

---

## 🎬 Demo

<div align="center">

| Feature | Preview |
|---|---|
| 🎤 Voice Input | Speak → Convert → Avatar Signs |
| ⌨️ Text Input | Type → Translate → Watch |
| 📜 History | Save, Review, Delete translations |
| 🌗 Theme Toggle | Light / Dark mode |

🔗 **[Try the live app →](https://speech2sign.up.railway.app/)**

</div>

---

## ✨ Features at a Glance

```
🎤 Speech Recognition      →  Browser-native voice capture
📝 Text Input              →  Manual English sentence entry
🧠 NLP Processing          →  spaCy-powered ISL grammar extraction
🤖 3D Avatar Animation     →  Three.js GLTF model with sign sequences
📦 Translation History     →  MongoDB-backed persistent storage
🗑️ History Management      →  Delete individual or all entries
🌗 Dark / Light Mode       →  User preference toggle
📱 Responsive Design       →  Mobile and desktop ready
🐳 Docker Ready            →  One-command containerized deployment
☁️ Cloud Hosted            →  Live on Railway
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT SIDE                        │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  HTML/CSS   │  │ JavaScript   │  │   Three.js    │  │
│  │  UI Layers  │  │  Speech API  │  │  3D Avatar    │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬───────┘  │
└─────────┼────────────────┼──────────────────┼──────────┘
          │         HTTP/REST API              │
┌─────────▼────────────────▼──────────────────▼──────────┐
│                     SERVER SIDE                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │               Flask Application                   │  │
│  │  ┌──────────┐  ┌─────────┐  ┌────────────────┐   │  │
│  │  │  spaCy   │  │  NLTK   │  │    PyMongo     │   │  │
│  │  │  NLP     │  │  Text   │  │    Database    │   │  │
│  │  │ Pipeline │  │  Prep   │  │    Queries     │   │  │
│  │  └──────────┘  └─────────┘  └───────┬────────┘   │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────┼───────────────────┘
                                      │
┌─────────────────────────────────────▼───────────────────┐
│                   MongoDB Atlas                          │
│              (Translation History Store)                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **3D Rendering** | Three.js, GLTFLoader |
| **Backend** | Python, Flask, Flask-CORS, Gunicorn |
| **NLP** | spaCy (`en_core_web_sm`), NLTK |
| **Database** | MongoDB Atlas (via PyMongo) |
| **Deployment** | Docker, Railway, Render |
| **Icons** | Feather Icons |
| **Config** | python-dotenv |

</div>

---

## 📁 Project Structure

```
speech-to-isl/
│
├── 📄 app.py                   # Flask app entry point & API routes
├── 🐳 Dockerfile               # Container configuration
├── ⚙️  render.yaml              # Render deployment config
├── 📦 requirements.txt         # Python dependencies
├── 🔐 .env                     # Local environment variables (not committed)
├── 🙈 .gitignore
│
├── 📂 templates/
│   ├── index.html              # Main translator UI
│   ├── about.html              # About page
│   └── contact.html            # Contact page
│
├── 📂 static/
│   ├── script.js               # Frontend logic & avatar control
│   ├── styles.css              # Theming & responsive design
│   ├── 📂 Models/              # GLTF 3D avatar model files
│   └── 📂 Animations/          # Sign animation clips
│
├── 📂 model/                   # NLP model assets
├── 📂 en_core_web_sm-3.4.0/    # Bundled spaCy language model
└── 📂 images/                  # Static image assets
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- pip
- MongoDB Atlas account (or local MongoDB)
- Git

---

### 1. Clone the repository

```bash
git clone https://github.com/Sijosaju/Speech-to-Indian-Sign-Language-using-3D-Avatar-Animations.git
cd Speech-to-Indian-Sign-Language-using-3D-Avatar-Animations
```

### 2. Set up a virtual environment

```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux / macOS
python -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

### 5. Run the app

```bash
python app.py
```

Open your browser at: **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## 🐳 Docker Deployment

```bash
# Build the image
docker build -t sign-language-app .

# Run the container
docker run -p 8080:8080 --env-file .env sign-language-app
```

App will be available at **[http://localhost:8080](http://localhost:8080)**

> The container runs via Gunicorn on port 8080.

---

## ☁️ Cloud Deployment

### Railway

1. Sign in at [railway.app](https://railway.app) with GitHub
2. Create a new project → Import this repository
3. Railway auto-detects the `Dockerfile`
4. Add the `MONGO_URI` environment variable in Railway's dashboard
5. Deploy — Railway assigns a public URL automatically

### Render

1. Connect the repository on [render.com](https://render.com)
2. The included `render.yaml` handles configuration
3. Add `MONGO_URI` as an environment variable
4. Deploy the Docker-based service

---

## 🗃️ MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Add a database user with read/write permissions
3. Set network access to `0.0.0.0/0` (for hosted environments)
4. Copy the connection string into your `.env` as `MONGO_URI`

---

## 📖 How to Use

### 🎤 Voice Mode
1. Click the **microphone** button
2. Speak a sentence clearly in English
3. The app transcribes, processes, and generates the ISL structure
4. The 3D avatar performs the corresponding sign sequence

### ⌨️ Text Mode
1. Switch to **text input** mode
2. Type your English sentence
3. Click **Translate**
4. ISL grammar output is shown and the avatar animates it

### 📜 History
- All translations are saved automatically to MongoDB
- View your full translation history in the history panel
- Delete individual entries or clear everything at once

---

## 🧠 How It Works

```
Input (Speech / Text)
        ↓
Contraction Expansion  →  "can't" becomes "cannot"
        ↓
spaCy NLP Pipeline     →  POS tagging, dependency parsing
        ↓
ISL Grammar Mapping    →  Reorder to Subject → Object → Verb
        ↓
Animation Lookup       →  Match words/signs to GLTF animation clips
        ↓
Three.js Avatar        →  Plays sign sequence on the 3D model
        ↓
MongoDB Storage        →  Saves input + ISL output to history
```

---

## 🔮 Future Roadmap

- [ ] Expand ISL vocabulary and phrase library
- [ ] Improve grammar conversion accuracy with a dedicated ISL corpus
- [ ] Regional sign variation support
- [ ] Enhanced avatar realism with improved motion blending
- [ ] User authentication and personal history
- [ ] Multilingual input support (Hindi, Malayalam, etc.)
- [ ] Interactive ISL learning/quiz module
- [ ] Mobile app version

---

## ⚠️ Deployment Notes

- Free-tier hosting (Railway, Render) may **sleep after inactivity** — the first request after a cold start may take a few seconds
- Never commit your `.env` file or `MONGO_URI` to GitHub
- Store secrets as environment variables directly in your hosting platform

---

## 📜 License

This project is intended for **academic, educational, and portfolio use**.

---

## 🙏 Acknowledgements

- [spaCy](https://spacy.io/) — NLP processing pipeline
- [Three.js](https://threejs.org/) — 3D avatar rendering
- [MongoDB Atlas](https://www.mongodb.com/atlas) — Cloud database
- [Flask](https://flask.palletsprojects.com/) — Lightweight Python backend
- [Railway](https://railway.app/) & [Render](https://render.com/) — Hosting platforms
- [Feather Icons](https://feathericons.com/) — Clean, minimal icons

---

<div align="center">

**Made with ❤️ to make the world more accessible**

*If this project helped or inspired you, consider giving it a ⭐*

</div>