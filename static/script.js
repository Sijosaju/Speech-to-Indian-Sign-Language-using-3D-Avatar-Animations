document.addEventListener('DOMContentLoaded', () => {
  const micButton = document.getElementById('micButton');
  const transcript = document.getElementById('transcript');
  const islBox = document.getElementById('islBox');
  const animationContainer = document.getElementById('animationContainer'); // Animation container
  
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
  
  // Function to display animations sequentially
  async function displayAnimationsSequentially(words) {
    animationContainer.innerHTML = ''; // Clear previous animations

    for (const word of words) {
      const animationFile = `static/animations/${word}.mp4`; // Path to word animation file

      // Check if the word animation exists
      const response = await fetch(animationFile);
      if (response.ok) {
        // Word animation exists, display it
        const videoElement = document.createElement('video');
        videoElement.src = animationFile;
        videoElement.autoplay = true;
        videoElement.controls = false;
        videoElement.classList.add('animation-video');

        // Create a container for the video and its name
        const animationWrapper = document.createElement('div');
        animationWrapper.classList.add('animation-wrapper');

        // Add the video element
        animationWrapper.appendChild(videoElement);

        // Add the video name below the video
        const videoName = document.createElement('div');
        videoName.textContent = word; // Display the word name
        videoName.classList.add('video-name');
        animationWrapper.appendChild(videoName);

        // Clear previous animation and display the new one
        animationContainer.innerHTML = '';
        animationContainer.appendChild(animationWrapper);

        // Wait for the video to finish playing
        await new Promise((resolve) => {
          videoElement.onended = resolve;
        });
      } else {
        // Word animation does not exist, fall back to letter animations
        await displayLetterAnimationsSequentially(word);
      }
    }
  }

  // Function to display letter animations sequentially for a word
  async function displayLetterAnimationsSequentially(word) {
    const letters = word.split(''); // Split the word into individual letters

    for (const letter of letters) {
      const letterAnimationFile = `static/animations/${letter}.mp4`; // Path to letter animation file

      // Check if the letter animation exists
      const response = await fetch(letterAnimationFile);
      if (response.ok) {
        // Letter animation exists, display it
        const videoElement = document.createElement('video');
        videoElement.src = letterAnimationFile;
        videoElement.autoplay = true;
        videoElement.controls = false;
        videoElement.classList.add('animation-video');

        // Create a container for the video and its name
        const animationWrapper = document.createElement('div');
        animationWrapper.classList.add('animation-wrapper');

        // Add the video element
        animationWrapper.appendChild(videoElement);

        // Add the video name below the video
        const videoName = document.createElement('div');
        videoName.textContent = letter; // Display the letter name
        videoName.classList.add('video-name');
        animationWrapper.appendChild(videoName);

        // Clear previous animation and display the new one
        animationContainer.innerHTML = '';
        animationContainer.appendChild(animationWrapper);

        // Wait for the video to finish playing
        await new Promise((resolve) => {
          videoElement.onended = resolve;
        });
      } else {
        // Letter animation does not exist, display a placeholder
        const placeholder = document.createElement('div');
        placeholder.textContent = letter;
        placeholder.classList.add('animation-placeholder');

        // Create a container for the placeholder and its name
        const animationWrapper = document.createElement('div');
        animationWrapper.classList.add('animation-wrapper');

        // Add the placeholder
        animationWrapper.appendChild(placeholder);

        // Add the placeholder name below the placeholder
        const videoName = document.createElement('div');
        videoName.textContent = letter; // Display the letter name
        videoName.classList.add('video-name');
        animationWrapper.appendChild(videoName);

        // Clear previous animation and display the new one
        animationContainer.innerHTML = '';
        animationContainer.appendChild(animationWrapper);

        // Wait for a short delay before showing the next letter
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      }
    }
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
      
      // Map animations based on ISL grammar
      const words = data.isl_structure.split(' ').filter(word => word.trim());
      displayAnimationsSequentially(words);
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
      micButton.innerHTML = '<i data-feather="mic"></i><span>Start Recording</span>';
      micButton.classList.remove('success', 'danger'); // Remove any conflicting classes
      micButton.classList.add('primary'); // Ensure the button is blue
      feather.replace(); // Re-render Feather icons
    }
  }

  document.getElementById("clearButton").addEventListener("click", () => {
    transcript.value = "";
    islBox.innerHTML = "";
    animationContainer.innerHTML = ""; // Clear animations
    
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