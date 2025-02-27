document.addEventListener('DOMContentLoaded', () => {
  const micButton = document.getElementById('micButton');
  const transcript = document.getElementById('transcript');
  const islBox = document.getElementById('islBox');
  
  let recognition;
  let isRecording = false;
  
  // Check for browser support
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("Your browser does not support speech recognition.");
    micButton.disabled = true;
    return;
  }
  
  function initializeRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    
    recognition.onstart = () => {
      micButton.textContent = "⏹ Stop Recording";
      micButton.style.backgroundColor = "#ff4444";
    };
    
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }
      transcript.value = finalTranscript + interimTranscript;
      if (finalTranscript) {
        sendTextForProcessing(finalTranscript);
      }
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      stopRecording();
    };
    
    recognition.onend = () => {
      if (isRecording) recognition.start();
    };
  }
  
  function formatISLStructure(islText) {
    const sentences = islText.split('|');
    return sentences.map(sentence => {
      // Trim extra whitespace
      const cleanSentence = sentence.trim();
      if (!cleanSentence) return '';
      
      const words = cleanSentence.split(' ').filter(word => word.trim());
      
      // Add semantic highlighting based on position in ISL sentence
      const formattedWords = [];
      words.forEach((word, index) => {
        let wordClass = 'isl-word';
        
        // First word is often time or question marker
        if (index === 0 && (isTimeWord(word) || isQuestionWord(word))) {
          wordClass += ' isl-time-question';
        } 
        // Subject typically comes first or after time
        else if (index === 0 || (index === 1 && isTimeWord(words[0]))) {
          wordClass += ' isl-subject';
        }
        // Verb is typically at the end in ISL
        else if (index === words.length - 1) {
          wordClass += ' isl-verb';
        }
        // Object typically comes before verb
        else if (index === words.length - 2 || index === words.length - 3) {
          wordClass += ' isl-object';
        }
        
        // Special case for negation words
        if (isNegationWord(word)) {
          wordClass += ' isl-negation';
        }
        
        formattedWords.push(`<span class="${wordClass}">${word}</span>`);
      });
      
      return formattedWords.join(' ');
    }).join('<span class="sentence-divider">|</span>');
  }
  
  // Helper functions to identify word types
  function isTimeWord(word) {
    const timeWords = ['today', 'tomorrow', 'yesterday', 'now', 'later', 'before', 'after', 
                      'morning', 'afternoon', 'evening', 'night', 'monday', 'tuesday', 
                      'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return timeWords.includes(word.toLowerCase());
  }
  
  function isQuestionWord(word) {
    const questionWords = ['what', 'where', 'when', 'who', 'why', 'how', 'which'];
    return questionWords.includes(word.toLowerCase());
  }
  
  function isNegationWord(word) {
    const negationWords = ['not', 'no', 'never', 'cannot'];
    return negationWords.includes(word.toLowerCase());
  }
  
  function sendTextForProcessing(text) {
    fetch("http://127.0.0.1:5000/save_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
      islBox.innerHTML = formatISLStructure(data.isl_structure);
      console.log("Text received from server:", data.original_text);
    })
    .catch(error => {
      console.error("Error processing text:", error);
      islBox.innerHTML = '<span style="color: red;">Error processing text. Please try again.</span>';
    });
  }
  
  function startRecording() {
    if (!recognition) initializeRecognition();
    recognition.start();
    isRecording = true;
  }
  
  function stopRecording() {
    if (recognition) {
      recognition.stop();
      isRecording = false;
      micButton.textContent = "🎤 Start Recording";
      micButton.style.backgroundColor = "#4CAF50";
      
      // Clear the transcript and ISL box
     // transcript.value = "";
      //islBox.innerHTML = "";
    }
  }

  document.getElementById("clearButton").addEventListener("click", () => {
    transcript.value = "";
    islBox.innerHTML = "";
  
    // Send request to backend to clear stored text
    fetch("http://127.0.0.1:5000/clear_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
      console.log("Storage cleared:", data.message);
    })
    .catch(error => {
      console.error("Error clearing text:", error);
    });
  });
  
  
  micButton.addEventListener("click", () => {
    isRecording ? stopRecording() : startRecording();
  });
});
  

  
  
  
  










