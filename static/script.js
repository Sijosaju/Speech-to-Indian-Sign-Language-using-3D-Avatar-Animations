document.addEventListener('DOMContentLoaded', () => {
  const micButton = document.getElementById('micButton');
  const transcript = document.getElementById('transcript');
  const islBox = document.getElementById('islBox');
  const animationContainer = document.getElementById('animationContainer');
  const historyPanel = document.getElementById('history-panel');
  
  let recognition;
  let isRecording = false;
  
  // Speech Recognition Setup
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech recognition not supported in this browser!");
    micButton.disabled = true;
    return;
  }

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  // History Functions
  function saveToHistory(originalText, islText) {
    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    history.unshift({
      id: Date.now(),
      text: originalText,
      isl: islText,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('conversionHistory', JSON.stringify(history.slice(0, 100))); // Keep last 100 items
  }

  function displayHistory() {
    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    const historyList = document.getElementById('history-list');
    
    historyList.innerHTML = history.length > 0 
      ? history.map(item => `
          <div class="history-item" data-id="${item.id}">
            <button class="delete-btn" data-id="${item.id}">
              <i data-feather="trash-2"></i>
            </button>
            <div class="history-time">${new Date(item.timestamp).toLocaleString()}</div>
            <div class="history-query">${item.text}</div>
            <div class="history-isl">${item.isl}</div>
          </div>
        `).join('')
      : '<div class="empty-history">No conversions yet</div>';
    
    feather.replace();
  }

  // History Event Listeners
  document.getElementById('history-button').addEventListener('click', () => {
    historyPanel.classList.add('show');
    displayHistory();
  });

  document.getElementById('close-history').addEventListener('click', () => {
    historyPanel.classList.remove('show');
  });

  document.getElementById('history-list').addEventListener('click', (e) => {
    if (e.target.closest('.delete-btn')) {
      const id = Number(e.target.closest('.delete-btn').dataset.id);
      let history = JSON.parse(localStorage.getItem('conversionHistory'));
      history = history.filter(item => item.id !== id);
      localStorage.setItem('conversionHistory', JSON.stringify(history));
      displayHistory();
    }
  });

  document.getElementById('clearHistoryButton').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all conversion history?")) {
      localStorage.removeItem('conversionHistory');
      displayHistory();
    }
  });
  

  // Speech Recognition Handlers
  recognition.onstart = () => {
    isRecording = true;
    micButton.innerHTML = '<i data-feather="mic-off"></i> Stop Recording';
    micButton.classList.add('recording');
    feather.replace();
  };

  recognition.onresult = (event) => {
    let interim = '';
    let final = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const text = event.results[i][0].transcript;
      event.results[i].isFinal ? final += text : interim += text;
    }
    
    transcript.value = final + interim;
    
    if (final) {
      sendTextForProcessing(final);
    }
  };

  recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
    stopRecording();
  };

  recognition.onend = () => {
    if (isRecording) recognition.start();
  };

  // Text Processing
  function sendTextForProcessing(text) {
    fetch("http://127.0.0.1:5000/save_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
      islBox.innerHTML = formatISLStructure(data.isl_structure);
      saveToHistory(data.original_text, data.isl_structure);
      // Split the ISL structure into words
      const words = data.isl_structure.split(' ').filter(w => w.trim());
      displayAnimationsSequentially(words);
    })
    .catch(error => {
      console.error("Processing error:", error);
      islBox.innerHTML = '<span class="error">Error processing text</span>';
    });
  }

  // ISL Formatting
  function formatISLStructure(islText) {
    return islText.split('|').map(sentence => 
      sentence.trim().split(' ').map(word => 
        `<span class="isl-word ${getWordClass(word)}">${word}</span>`
      ).join(' ')
    ).join('<span class="sentence-divider">|</span>');
  }

  function getWordClass(word) {
    if (isTimeWord(word)) return 'time';
    if (isQuestionWord(word)) return 'question';
    if (isNegationWord(word)) return 'negation';
    return '';
  }

  // Animation Handling
  async function displayAnimationsSequentially(words) {
    animationContainer.innerHTML = '';
    for (const word of words) {
      await displayWordAnimation(word.toLowerCase());
    }
  }

  async function displayWordAnimation(word) {
    const animationFile = `static/animations/${word}.mp4`;
    try {
      const response = await fetch(animationFile);
      if (response.ok) {
        // Word animation exists – display it
        const videoElement = document.createElement('video');
        videoElement.src = animationFile;
        videoElement.autoplay = true;
        videoElement.controls = false;
        videoElement.classList.add('animation-video');
  
        // Clear previous animation and display the new one
        animationContainer.innerHTML = '';
        animationContainer.appendChild(videoElement);
  
        // Wait until the video finishes
        await new Promise(resolve => {
          videoElement.onended = resolve;
        });
      } else {
        // Fallback: display letter animations
        await displayLetterAnimationsSequentially(word);
      }
    } catch (error) {
      console.error("Error fetching animation:", error);
      await displayLetterAnimationsSequentially(word);
    }
  }

  async function displayLetterAnimationsSequentially(word) {
    const letters = word.split('');
    for (const letter of letters) {
      const letterAnimationFile = `static/animations/${letter}.mp4`;
      try {
        const response = await fetch(letterAnimationFile);
        if (response.ok) {
          const videoElement = document.createElement('video');
          videoElement.src = letterAnimationFile;
          videoElement.autoplay = true;
          videoElement.controls = false;
          videoElement.classList.add('animation-video');
  
          animationContainer.innerHTML = '';
          animationContainer.appendChild(videoElement);
  
          await new Promise(resolve => {
            videoElement.onended = resolve;
          });
        } else {
          displayLetterPlaceholder(letter);
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
        }
      } catch (error) {
        console.error("Error fetching letter animation:", error);
        displayLetterPlaceholder(letter);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  function displayLetterPlaceholder(letter) {
    const placeholder = document.createElement('div');
    placeholder.textContent = letter;
    placeholder.classList.add('animation-placeholder');
  
    const animationWrapper = document.createElement('div');
    animationWrapper.classList.add('animation-wrapper');
    animationWrapper.appendChild(placeholder);
  
    const videoName = document.createElement('div');
    videoName.textContent = letter;
    videoName.classList.add('video-name');
    animationWrapper.appendChild(videoName);
  
    animationContainer.innerHTML = '';
    animationContainer.appendChild(animationWrapper);
  }

  // UI Controls
  micButton.addEventListener('click', () => {
    isRecording ? stopRecording() : startRecording();
  });

  document.getElementById('clearButton').addEventListener('click', () => {
    transcript.value = '';
    islBox.innerHTML = '';
    animationContainer.innerHTML = '<div class="placeholder-animation"><i data-feather="video"></i><p>Animation will appear here</p></div>';
    feather.replace();
  });

  function startRecording() {
    recognition.start();
    isRecording = true;
  }

  function stopRecording() {
    recognition.stop();
    isRecording = false;
    micButton.innerHTML = '<i data-feather="mic"></i> Start Recording';
    micButton.classList.remove('recording');
    feather.replace();
  }

  // Helper Functions
  function isTimeWord(word) {
    const timeWords = ['today', 'tomorrow', 'yesterday', 'now', 'later'];
    return timeWords.includes(word.toLowerCase());
  }

  function isQuestionWord(word) {
    const questionWords = ['what', 'where', 'when', 'why', 'how'];
    return questionWords.includes(word.toLowerCase());
  }

  function isNegationWord(word) {
    return ['not', 'no', 'never'].includes(word.toLowerCase());
  }

  // Initialize Feather Icons
  feather.replace();
});
