document.addEventListener("DOMContentLoaded", function () {
    const speechText = document.getElementById("speechText");
    const translationDiv = document.getElementById("translation");
    let recognition;
  
    // Check if browser supports Speech Recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-IN";  // Set language to Indian English
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
  
        // When speech is recognized
        recognition.onresult = function (event) {
            let transcript = event.results[0][0].transcript;
            speechText.value = transcript;
  
            // Send transcript to backend for ISL conversion
            fetch("/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: transcript })
            })
            .then(response => response.json())
            .then(data => {
                translationDiv.innerText = data.translation || "No translation available.";
            })
            .catch(error => console.error("Error:", error));
        };
  
        // Handle errors
        recognition.onerror = function (event) {
            console.error("Speech Recognition Error: ", event.error);
            alert("Speech recognition error: " + event.error);
        };
    } else {
        alert("Speech recognition is not supported in this browser.");
    }
  
    // Function to start recording
    window.startRecording = function () {
        if (recognition) {
            recognition.start();
        }
    };
  
    // Function to clear text areas
    window.clearText = function () {
        speechText.value = "";
        translationDiv.innerText = "ISL translation will appear here...";
    };
  });
  