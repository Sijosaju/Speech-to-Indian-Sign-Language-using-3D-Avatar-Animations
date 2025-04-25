// Import Three.js, GLTFLoader, and defaultPose via the import map
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { defaultPose } from './Animations/defaultPose.js';

document.addEventListener('DOMContentLoaded', () => {
  // Element selectors - ADDED NEW SELECTORS
  const micButton = document.getElementById('micButton');
  const textSubmitButton = document.getElementById('textSubmitButton');
  const textInput = document.getElementById('textInput');
  const transcriptField = document.getElementById('transcript');
  const islBox = document.getElementById('islBox');
  const processedTextField = document.getElementById('processed-text');
  const animationContainer = document.getElementById('animationContainer');
  const historyPanel = document.getElementById('history-panel');
  const speedSlider = document.getElementById('speedSlider');
  const speedValue = document.getElementById('speedValue');
  const inputTitle = document.getElementById('input-title');
  const tabButtons = document.querySelectorAll('.tab-button');

  // Global state for the animation system
  const state = {
    text: '',
    bot: 'ybot',
    speed: 0.1,
    baseSpeed: 0.1,
    speedMultiplier: 1.0,
    pause: 800,
    listening: false,
    animations: [],
    scene: null,
    camera: null,
    renderer: null,
    avatar: null,
    flag: false,
    pending: false,
    textTimer: false,
    characters: [],
    alphabetModules: {},
    wordModules: {},
    numberModules: {},
    wordList: [],
    numberList: ['0','1','2','3','4','5','6','7','8','9'],
    currentInputMode: 'voice' // NEW: Track current input mode
  };

  let recognition;
  let isRecording = false;

  // Initialize Speech Recognition
  if (!('webkitSpeechRecognition' in window)) {
    console.warn("Speech recognition not supported in this browser!");
    micButton.disabled = true;
    // Fall back to text input if voice not supported
    switchToTextInput();
  } else {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
  }

  // -------------------------
  // NEW: Tab Switching Functionality
  // -------------------------
  function switchToVoiceInput() {
    state.currentInputMode = 'voice';
    textInput.style.display = 'none';
    transcriptField.style.display = 'block';
    micButton.style.display = 'flex';
    textSubmitButton.style.display = 'none';
    inputTitle.textContent = 'Speech Input';
    // Clear any existing text
    textInput.value = '';
  }

  function switchToTextInput() {
    state.currentInputMode = 'text';
    textInput.style.display = 'block';
    transcriptField.style.display = 'none';
    micButton.style.display = 'none';
    textSubmitButton.style.display = 'flex';
    inputTitle.textContent = 'Text Input';
    // Stop recording if active
    if (isRecording) {
      stopRecording();
    }
  }

  // Set up tab event listeners
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      if (button.dataset.tab === 'voice') {
        switchToVoiceInput();
      } else {
        switchToTextInput();
      }
    });
  });

  // -------------------------
  // NEW: Text Input Handling
  // -------------------------
  function handleTextSubmit() {
    const text = textInput.value.trim();
    if (text) {
      // Display the text in the transcript field (optional)
      transcriptField.value = text;
      // Process the text (same as voice input)
      sendTextForProcessing(text);
    } else {
      alert('Please enter some text to translate');
    }
  }

  textSubmitButton.addEventListener('click', handleTextSubmit);

  // Optional: Submit on Ctrl/Cmd + Enter
  textInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleTextSubmit();
    }
  });

  // -------------------------
  // Speed Slider Handler
  // -------------------------
  if (speedSlider) {
    speedValue.textContent = `${speedSlider.value}x`;
    
    speedSlider.addEventListener('input', () => {
      const multiplier = parseFloat(speedSlider.value);
      state.speedMultiplier = multiplier;
      state.speed = state.baseSpeed * multiplier;
      speedValue.textContent = `${multiplier.toFixed(1)}x`;
    });
  }

  // -------------------------
  // Speech Recognition Methods
  // -------------------------
  const startRecording = () => {
    if (state.currentInputMode !== 'voice') return;
    
    console.log("Starting speech recognition");
    recognition.start();
    isRecording = true;
  };

  const stopRecording = () => {
    console.log("Stopping speech recognition");
    recognition.stop();
    isRecording = false;
    micButton.innerHTML = '<i data-feather="mic"></i> Start Recording';
    micButton.classList.remove('recording');
    feather.replace();
  };

  // -------------------------
  // 3D Animation System Setup
  // -------------------------
  state.animate = function() {
    requestAnimationFrame(this.animate.bind(this));
    if (!this.scene || !this.camera || !this.renderer) {
      console.warn("Scene, camera or renderer not initialized");
      return;
    }
    this.renderer.render(this.scene, this.camera);

    if (!this.avatar || this.animations.length === 0) return;

    const currentAnim = this.animations[0];

    if (currentAnim && currentAnim.length) {
      if (!this.flag) {
        if (currentAnim[0] === 'add-text') {
          addTextStep(currentAnim);
          return;
        } else {
          processBoneAnimation(currentAnim, this);
        }
      }
    } else {
      if (!this.flag) {
        this.flag = true;
        setTimeout(() => {
          this.flag = false;
          this.animations.shift();
        }, this.pause / this.speedMultiplier);
      }
    }
  };

  function addTextStep(animCommand) {
    if (!state.textTimer) {
      if (processedTextField) {
        processedTextField.textContent += animCommand[1];
      }
      state.textTimer = true;
      setTimeout(() => {
        state.textTimer = false;
        state.animations.shift();
      }, 100 / state.speedMultiplier);
    }
  }

  function processBoneAnimation(animSteps, ctx) {
    for (let i = 0; i < animSteps.length;) {
      const [boneName, action, axis, limit, sign] = animSteps[i];
      const bone = ctx.avatar.getObjectByName(boneName);
      if (bone) {
        if (sign === "+" && bone[action][axis] < limit) {
          bone[action][axis] = Math.min(bone[action][axis] + ctx.speed, limit);
          i++;
        } else if (sign === "-" && bone[action][axis] > limit) {
          bone[action][axis] = Math.max(bone[action][axis] - ctx.speed, limit);
          i++;
        } else {
          animSteps.splice(i, 1);
        }
      } else {
        console.warn(`Bone not found: ${boneName}`);
        animSteps.splice(i, 1);
      }
    }
  }

  // -------------------------
  // History Management
  // -------------------------
  const saveToHistory = (originalText, islText) => {
    fetch("/save_history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ original_text: originalText, isl_text: islText })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) console.error("History save error:", data.error);
      })
      .catch(error => console.error("Error saving history:", error));
  };

  const displayHistory = () => {
    fetch("/get_history")
      .then(response => response.json())
      .then(data => {
        const historyList = document.getElementById('history-list');
        if (data.error) {
          historyList.innerHTML = `<div class="error">${data.error}</div>`;
        } else if (data.length > 0) {
          historyList.innerHTML = data.map(entry => `
            <div class="history-item" data-id="${entry._id}">
              <button class="delete-btn" data-id="${entry._id}">
                <i data-feather="trash-2"></i>
              </button>
              <div class="history-time">${new Date(entry.timestamp).toLocaleString()}</div>
              <div class="history-query">${entry.original_text}</div>
              <div class="history-isl">${entry.isl_text}</div>
            </div>
          `).join('');
        } else {
          historyList.innerHTML = '<div class="empty-history">No conversions yet</div>';
        }
        feather.replace();
      })
      .catch(error => {
        console.error("History fetch error:", error);
        document.getElementById('history-list').innerHTML = '<div class="error">Error loading history</div>';
      });
  };

  // -------------------------
  // Module Loading Helpers
  // -------------------------
  function getAnimationFunction(moduleObj, key) {
    if (moduleObj[key] && typeof moduleObj[key] === 'function') return moduleObj[key];
    if (moduleObj.default && typeof moduleObj.default === 'function') return moduleObj.default;
    for (const exportName in moduleObj) {
      if (typeof moduleObj[exportName] === 'function') return moduleObj[exportName];
    }
    return null;
  }

  const loadAlphabetModules = async () => {
    const alphabetChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (const char of alphabetChars) {
      try {
        const moduleObj = await import(`./Animations/alphabets/${char}.js`);
        const animationFunction = getAnimationFunction(moduleObj, char);
        if (animationFunction) state.alphabetModules[char] = animationFunction;
      } catch (error) {
        console.warn(`Failed to load animation for letter ${char}:`, error);
      }
    }
  };
// Add new Words
  const loadWordModules = async () => {
    const commonWords = ['HOME', 'TIME', 'YOU', 'PERSON'];
    for (const word of commonWords) {
      try {
        const moduleObj = await import(`./Animations/words/${word.toLowerCase()}.js`);
        const animationFunction = getAnimationFunction(moduleObj, word);
        if (animationFunction) {
          state.wordModules[word] = animationFunction;
          state.wordList.push(word);
        }
      } catch (error) {
        console.warn(`Failed to load animation for word ${word}:`, error);
      }
    }
  };

  const loadNumberModules = async () => {
    const numbers = '0123456789';
    for (const num of numbers) {
      try {
        const moduleObj = await import(`./Animations/numbers/${num}.js`);
        const animationFunction = getAnimationFunction(moduleObj, num);
        if (animationFunction) state.numberModules[num] = animationFunction;
      } catch (error) {
        console.error(`Failed to load animation for number ${num}:`, error);
      }
    }
  };

  // -------------------------
  // Three.js Initialization
  // -------------------------
  function initThree() {
    animationContainer.innerHTML = '';
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color(0xffffff);
    
    state.camera = new THREE.PerspectiveCamera(
      30,
      animationContainer.clientWidth / animationContainer.clientHeight,
      0.1,
      1000
    );
    state.camera.position.set(0, 1.6, 1.5);
    state.camera.lookAt(0, 1.4, 0);
    
    state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    state.renderer.setPixelRatio(window.devicePixelRatio);
    state.renderer.shadowMap.enabled = true;
    state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    state.renderer.setSize(animationContainer.clientWidth, animationContainer.clientHeight);
    animationContainer.appendChild(state.renderer.domElement);
  
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    state.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 3, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    state.scene.add(directionalLight);
  
    return true;
  }
  
  function loadModel(modelPath) {
    return new Promise((resolve, reject) => {
      fetch(modelPath)
        .then(response => {
          if (!response.ok) throw new Error(`Model file not found: ${modelPath}`);
          const loader = new GLTFLoader();
          if (state.avatar) state.scene.remove(state.avatar);
          loader.load(
            modelPath,
            (gltf) => {
              gltf.scene.traverse((child) => {
                if (child.isMesh) {
                  child.frustumCulled = false;
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              });
              state.avatar = gltf.scene;
              state.scene.add(state.avatar);
              try {
                defaultPose(state);
                resolve();
              } catch (error) {
                reject(error);
              }
            },
            undefined,
            (error) => reject(error)
          );
        })
        .catch(error => reject(error));
    });
  }
  
  // -------------------------
  // Processing Animation Commands
  // -------------------------
  function processAnimation(text) {
    if (!text) return;
    
    const processedText = text.toUpperCase()
      .replace(/ZERO/gi, '0')
      .replace(/ONE/gi, '1')
      .replace(/TWO/gi, '2')
      .replace(/THREE/gi, '3')
      .replace(/FOUR/gi, '4')
      .replace(/FIVE/gi, '5')
      .replace(/SIX/gi, '6')
      .replace(/SEVEN/gi, '7')
      .replace(/EIGHT/gi, '8')
      .replace(/NINE/gi, '9');
    
    const words = processedText.split(/(\d+|\s+)/).filter(w => w.trim() !== '');
    
    state.animations = [];
    state.characters = [];
    
    if (processedTextField) processedTextField.textContent = '';

    words.forEach(word => {
      if (/^\d+$/.test(word)) {
        [...word].forEach(digit => {
          state.animations.push(['add-text', digit]);
          if (state.numberModules[digit]) state.numberModules[digit](state);
        });
        state.animations.push(['add-text', ' ']);
      }
      else if (state.wordList.includes(word)) {
        state.animations.push(['add-text', `${word} `]);
        state.wordModules[word](state);
      } 
      else {
        [...word].forEach((ch, i) => {
          const charText = (i === word.length - 1) ? `${ch} ` : ch;
          state.animations.push(['add-text', charText]);
          if (state.alphabetModules[ch]) state.alphabetModules[ch](state);
        });
      }
    });

    if (!state.pending && state.animations.length > 0) {
      state.pending = true;
      state.animate();
    }
  }

  // -------------------------
  // Sending Text for Processing
  // -------------------------
  function sendTextForProcessing(text) {
    fetch("/save_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })
      .then(response => response.json())
      .then(data => {
        islBox.innerHTML = formatISLStructure(data.isl_structure);
        saveToHistory(data.original_text, data.isl_structure);
        processAnimation(data.isl_structure);
      })
      .catch(error => {
        console.error("Processing error:", error);
        islBox.innerHTML = '<span class="error">Error processing text</span>';
      });
  }

  // -------------------------
  // Formatting ISL Structure
  // -------------------------
  function formatISLStructure(islText) {
    return islText.split('|')
      .map(sentence =>
        sentence.trim().split(' ')
          .map(word => `<span class="isl-word ${getWordClass(word)}">${word}</span>`)
          .join(' ')
      )
      .join('<span class="sentence-divider">|</span>');
  }

  function getWordClass(word) {
    if (/\d/.test(word)) return 'number';
    if (["what", "why", "how", "when", "where"].includes(word.toLowerCase())) return 'question';
    if (["not", "no"].includes(word.toLowerCase())) return 'negation';
    return '';
  }

  // -------------------------
  // Event Listeners for UI Actions
  // -------------------------
  document.getElementById('history-button').addEventListener('click', () => {
    historyPanel.classList.add('show');
    displayHistory();
  });

  document.getElementById('close-history').addEventListener('click', () => {
    historyPanel.classList.remove('show');
  });

  document.getElementById('history-list').addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      if (confirm("Are you sure you want to delete this entry?")) {
        fetch(`/delete_history/${id}`, { method: "DELETE" })
          .then(response => response.json())
          .then(data => data.error ? alert(data.error) : displayHistory())
          .catch(error => console.error("Delete error:", error));
      }
    }
  });

  document.getElementById('clearHistoryButton').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all conversion history?")) {
      fetch("/clear_history", { method: "DELETE" })
        .then(response => response.json())
        .then(data => data.error ? alert(data.error) : displayHistory())
        .catch(error => console.error("Clear error:", error));
    }
  });

  micButton.addEventListener('click', () => {
    isRecording ? stopRecording() : startRecording();
  });

  document.getElementById('clearButton').addEventListener('click', () => {
    transcriptField.value = '';
    textInput.value = '';
    islBox.innerHTML = '';
    processedTextField.textContent = '';
    state.animations = [];
    if (!state.scene) {
      animationContainer.innerHTML = '';
      const placeholderDiv = document.createElement('div');
      placeholderDiv.className = 'placeholder-animation';
      placeholderDiv.innerHTML = '<i data-feather="video"></i><p>Animation will appear here</p>';
      animationContainer.appendChild(placeholderDiv);
      feather.replace();
    }
  });

  // -------------------------
  // Speech Recognition Event Handlers
  // -------------------------
  if (recognition) {
    recognition.onstart = () => {
      isRecording = true;
      micButton.innerHTML = '<i data-feather="mic-off"></i> Stop Recording';
      micButton.classList.add('recording');
      feather.replace();
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        let text = event.results[i][0].transcript;
        
        text = text
          .replace(/zero/gi, '0')
          .replace(/one/gi, '1')
          .replace(/two/gi, '2')
          .replace(/three/gi, '3')
          .replace(/four/gi, '4')
          .replace(/five/gi, '5')
          .replace(/six/gi, '6')
          .replace(/seven/gi, '7')
          .replace(/eight/gi, '8')
          .replace(/nine/gi, '9');
        
        event.results[i].isFinal ? finalTranscript += text : interimTranscript += text;
      }
      transcriptField.value = finalTranscript + interimTranscript;
      if (finalTranscript) sendTextForProcessing(finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      stopRecording();
    };

    recognition.onend = () => {
      if (isRecording) recognition.start();
    };
  }

  // -------------------------
  // Initialize 3D System and App
  // -------------------------
  async function init3DSystem() {
    try {
      if (!initThree()) throw new Error("Three.js initialization failed");
      await loadAlphabetModules();
      await loadWordModules();
      await loadNumberModules();
      await loadModel(`/static/Models/${state.bot}/${state.bot}.glb`);
      
      window.addEventListener('resize', () => {
        if (state.camera && state.renderer) {
          state.camera.aspect = animationContainer.clientWidth / animationContainer.clientHeight;
          state.camera.updateProjectionMatrix();
          state.renderer.setSize(animationContainer.clientWidth, animationContainer.clientHeight);
        }
      });
      
      return true;
    } catch (error) {
      console.error('3D System initialization error:', error);
      return false;
    }
  }

  async function initApp() {
    feather.replace();
    await init3DSystem();
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  // Start the application
  initApp();
});