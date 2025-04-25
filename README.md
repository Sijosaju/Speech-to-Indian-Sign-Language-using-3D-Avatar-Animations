# Speech to Indian Sign Language using 3D Avatar Animation  

This project is a web-based application that translates spoken English into Indian Sign Language (ISL) and visualizes it through a 3D avatar. It uses speech recognition to capture user input, processes the text to extract relevant ISL structures, and then animates a 3D avatar to demonstrate the signs. The application also includes a history feature to save and manage past translations.

## Key Features

* **Speech Recognition:** Captures spoken English using the browser's Web Speech API.
* **Text Processing:** Preprocesses the input text, expands contractions, handles time formats, and removes unnecessary words to simplify ISL conversion.
* **ISL Structure Extraction:** Extracts essential words and tense markers to form the ISL structure using spaCy.
* **3D Avatar Animation:** Animates a 3D avatar to perform the corresponding ISL signs based on the extracted structure.
* **Dynamic Module Loading:** Loads animation modules for individual letters and words dynamically, allowing for easy expansion of the sign library.
* **History Management:** Saves and displays past translations, allowing users to review and manage their history.
* **Web-Based Interface:** Provides a user-friendly interface with controls for recording, clearing text, and managing history.
* **Responsive Design:** Adapts to different screen sizes for optimal viewing on various devices.
* **Theme Toggle:** Supports both light and dark modes for user preference.

## Technologies Used

* **Frontend:**
    * HTML, CSS, JavaScript
    * Three js (for 3D rendering)
    * GLTFLoader (for loading 3D models)
    * Fetch API (for client-server communication)
    * Feather Icons (for UI icons)
* **Backend:**
    * Python
    * Flask (web framework)
    * Flask-CORS (for handling Cross-Origin Resource Sharing)
    * NLTK (Natural Language Toolkit for text processing)
    * spaCy (for advanced natural language processing)
    * PyMongo (for MongoDB interaction)
    * dotenv (for environment variable management)
* **Database:**
    * MongoDB Atlas (for storing translation history)

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sijosaju/Speech-to-Indian-Sign-Language-using-3D-Avatar-Animations.git
    cd Speech-to-Indian-Sign-Language-using-3D-Avatar-Animations
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate  # On Windows
    ```
3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Install spaCy English model:**
    ```bash
    python -m spacy download en_core_web_sm
    ```
5.  **Set up environment variables:**
    * Create a `.env` file in the project root.
    * Add your MongoDB connection URI: `MONGO_URI=your_mongodb_uri`
6.  **Run the Flask application:**
    ```bash
    python app.py
    ```
7.  **Open the application in your browser:**
    * Navigate to `http://127.0.0.1:5000/`.

## Usage

1.  **Start Recording:** Click the microphone button to begin speech recognition.
2.  **Speak English:** Speak the text you want to translate into ISL.
3.  **View Translation:** The transcribed text will appear, and the 3D avatar will animate the corresponding ISL signs.
4.  **Manage History:** Use the history button to view, delete, or clear past translations.
5.  **Clear Text:** Use the clear button to reset the input and output fields.
6.  **Toggle Theme:** Use the theme toggle to switch between light and dark modes.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.
