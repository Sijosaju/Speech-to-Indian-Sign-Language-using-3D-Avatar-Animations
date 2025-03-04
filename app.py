from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import nltk
from nltk.tokenize import word_tokenize
import logging
import spacy
import string
import re

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Download required NLTK resources
def download_nltk_resources():
    resources = ['punkt', 'averaged_perceptron_tagger']
    for resource in resources:
        try:
            nltk.download(resource, quiet=True)
        except Exception as e:
            logger.error(f"Error downloading {resource}: {e}")

download_nltk_resources()

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except Exception as e:
    logger.error("Error loading spaCy model. Run 'python -m spacy download en_core_web_sm' to download the model.")
    raise e

app = Flask(__name__, template_folder="templates")
CORS(app)

def preprocess_text(text):
    """Enhanced preprocessing for ISL conversion with time format preservation."""
    text = text.lower().strip()

    # Keep colons (for time expressions like 12:00)
    text = re.sub(r'[^\w\s:]', '', text)

    return text


def extract_isl_structure_spacy(text):
    """
    Converts each word in the input sentence to its base form and removes unnecessary words.
    Also identifies tense markers for ISL representation and preserves directional words.
    """
    doc = nlp(text)
    important_words = []
    tense_marker = ""

    # List of direction-related words that should not be lemmatized
    direction_words = {"left", "right", "back", "straight", "forward", "up", "down"}

    for token in doc:
        # Preserve direction words as they are
        if token.text.lower() in direction_words:
            important_words.append(token.text.lower())
            continue

        # Remove auxiliary verbs
        if token.pos_ in ["AUX"] and token.lemma_ in ["be", "do", "have", "will"]:
            if token.lemma_ == "will":
                tense_marker = "FUTURE"
            continue 
        
        if token.pos_ in ["DET", "ADP"]:  # Remove determiners and prepositions
            continue
        
        if token.tag_ in ["VBD", "VBN"]:  # Past tense verbs
            tense_marker = "PAST"
            important_words.append(token.lemma_)
        elif token.tag_ in ["VBG", "VBZ", "VBP"]:  # Present continuous/simple present
            tense_marker = "NOW"
            important_words.append(token.lemma_)
        else:
            important_words.append(token.lemma_)

    # Add the tense marker at the end if applicable
    if tense_marker:
        important_words.append(tense_marker)

    return " ".join(important_words) if important_words else text

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_text', methods=['POST'])
def save_text():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"isl_structure": "", "message": "No data provided", "error": True}), 400
        
        text = data.get("text", "").strip()
        if not text:
            return jsonify({"isl_structure": "", "message": "No text provided", "error": True}), 400
        
        logger.info(f"Received text: {text}")
        processed_text = preprocess_text(text)
        
        isl_structure = extract_isl_structure_spacy(processed_text)
        logger.debug(f"spaCy extraction: {isl_structure}")
        
        return jsonify({
            "isl_structure": isl_structure,
            "original_text": text,
            "message": "Text processed successfully",
            "error": False
        })
    except Exception as e:
        logger.error(f"Error in save_text: {e}")
        return jsonify({"isl_structure": "", "message": "Server error occurred", "error": True}), 500

if __name__ == '__main__':
    app.run(debug=True)




















































