from flask import Flask, render_template, request, jsonify
import google.cloud.speech_v1 as speech
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Simple ISL translation logic (Placeholder)
    isl_translation = text.replace("hello", "👋").replace("yes", "👍").replace("no", "👎")  # Example mapping

    return jsonify({"translation": isl_translation})

# ✅ Ignore the missing favicon request
@app.route('/favicon.ico')
def favicon():
    return '', 204  # Returns an empty response with "No Content" status

if __name__ == '__main__':
    app.run(debug=True)
    from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

