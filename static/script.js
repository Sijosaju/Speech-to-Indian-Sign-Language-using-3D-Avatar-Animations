// Import Three.js, GLTFLoader, and defaultPose via the import map
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { defaultPose } from './Animations/defaultPose.js';

document.addEventListener('DOMContentLoaded', () => {
  const micButton = document.getElementById('micButton');
  const transcript = document.getElementById('transcript');
  const islBox = document.getElementById('islBox');
  const animationContainer = document.getElementById('animationContainer');
  const historyPanel = document.getElementById('history-panel');

  let recognition;
  let isRecording = false;

  // Global state object for animation system
  let state = {
    text: '',
    bot: 'ybot',
    speed: 0.1,
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
    wordList: []
  };

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

  // Debug: log when startRecording is called
  function startRecording() {
    console.log("startRecording called");
    recognition.start();
    isRecording = true;
  }

  function stopRecording() {
    console.log("stopRecording called");
    recognition.stop();
    isRecording = false;
    micButton.innerHTML = '<i data-feather="mic"></i> Start Recording';
    micButton.classList.remove('recording');
    feather.replace();
  }

  // Animation System Setup
  state.animate = function() {
    requestAnimationFrame(this.animate.bind(this));
    if (!this.scene || !this.camera || !this.renderer) {
      console.warn("Scene, camera or renderer not initialized");
      return;
    }
    this.renderer.render(this.scene, this.camera);
    if (!this.avatar) return;
    if (this.animations.length === 0) return;
    const currentAnim = this.animations[0];
    if (currentAnim && currentAnim.length) {
      if (!this.flag) {
        if (currentAnim[0] === 'add-text') {
          if (!this.textTimer) {
            const outputText = document.getElementById('output-text');
            if (outputText) outputText.value += currentAnim[1];
            this.textTimer = true;
            setTimeout(() => {
              this.textTimer = false;
              this.animations.shift();
            }, 100);
          }
          return;
        } else {
          for (let i = 0; i < currentAnim.length;) {
            const step = currentAnim[i];
            const [boneName, action, axis, limit, sign] = step;
            const bone = this.avatar.getObjectByName(boneName);
            if (bone) {
              if (sign === "+" && bone[action][axis] < limit) {
                bone[action][axis] += this.speed;
                bone[action][axis] = Math.min(bone[action][axis], limit);
                i++;
              } else if (sign === "-" && bone[action][axis] > limit) {
                bone[action][axis] -= this.speed;
                bone[action][axis] = Math.max(bone[action][axis], limit);
                i++;
              } else {
                currentAnim.splice(i, 1);
              }
            } else {
              console.warn(`Bone not found: ${boneName}`);
              currentAnim.splice(i, 1);
            }
          }
        }
      }
    } else {
      if (!this.flag) {
        this.flag = true;
        setTimeout(() => {
          this.flag = false;
          this.animations.shift();
        }, this.pause);
      }
    }
  };

  // History Functions
  function saveToHistory(originalText, islText) {
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
  }

  function displayHistory() {
    fetch("/get_history")
      .then(response => response.json())
      .then(data => {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = data.error
          ? `<div class="error">${data.error}</div>`
          : data.length > 0
            ? data.map(entry => `
                <div class="history-item" data-id="${entry._id}">
                  <button class="delete-btn" data-id="${entry._id}">
                    <i data-feather="trash-2"></i>
                  </button>
                  <div class="history-time">${new Date(entry.timestamp).toLocaleString()}</div>
                  <div class="history-query">${entry.original_text}</div>
                  <div class="history-isl">${entry.isl_text}</div>
                </div>
              `).join('')
            : '<div class="empty-history">No conversions yet</div>';
        feather.replace();
      })
      .catch(error => {
        console.error("History fetch error:", error);
        document.getElementById('history-list').innerHTML = '<div class="error">Error loading history</div>';
      });
  }

  // Animation Helper Functions
  function getAnimationFunction(moduleObj, key) {
    if (moduleObj.default && typeof moduleObj.default === 'function') {
      return moduleObj.default;
    } else if (moduleObj[key] && typeof moduleObj[key] === 'function') {
      return moduleObj[key];
    } else if (moduleObj.animate && typeof moduleObj.animate === 'function') {
      return moduleObj.animate;
    }
    return null;
  }

  // Load alphabet modules using capital letters (e.g., A.js, B.js, etc.)
  async function loadAlphabetModules() {
    const alphabetChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (const char of alphabetChars) {
      try {
        const moduleObj = await import(`/static/Animations/alphabets/${char}.js`);
        const animationFunction = getAnimationFunction(moduleObj, char);
        if (animationFunction) {
          state.alphabetModules[char] = animationFunction;
        } else {
          console.warn(`Animation for letter ${char} is not a function.`, moduleObj);
        }
      } catch (error) {
        console.warn(`Failed to load animation for letter ${char}:`, error);
      }
    }
  }

  async function loadWordModules() {
    const commonWords = ['HOME', 'TIME', 'YOU', 'PERSON'];
    for (const word of commonWords) {
      try {
        const moduleObj = await import(`/static/Animations/words/${word.toLowerCase()}.js`);
        const animationFunction = getAnimationFunction(moduleObj, word);
        if (animationFunction) {
          state.wordModules[word] = animationFunction;
          state.wordList.push(word);
        } else {
          console.warn(`Animation for word ${word} is not a function.`, moduleObj);
        }
      } catch (error) {
        console.warn(`Failed to load animation for word ${word}:`, error);
      }
    }
  }

  function initThree() {
    animationContainer.innerHTML = '';
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color(0xdddddd);
    state.camera = new THREE.PerspectiveCamera(
      30,
      animationContainer.clientWidth / animationContainer.clientHeight,
      0.1,
      1000
    );
    state.camera.position.set(0, 1.6, 1.5);
    state.camera.lookAt(0, 1.4, 0);
    state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    state.renderer.setSize(animationContainer.clientWidth, animationContainer.clientHeight);
    animationContainer.appendChild(state.renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    state.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 3, 3);
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
                if (child.type === 'SkinnedMesh') child.frustumCulled = false;
              });
              state.avatar = gltf.scene;
              state.scene.add(state.avatar);
              try {
                defaultPose(state);
                resolve();
              } catch (error) {
                console.error("Error applying default pose:", error);
                reject(error);
              }
            },
            (xhr) => console.log(`${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`),
            (error) => {
              console.error('Error loading model:', error);
              reject(error);
            }
          );
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }

  function processAnimation(text) {
    if (!text) return;
    const words = text.toUpperCase().split(' ').filter(w => w.trim() !== '');
    state.animations = [];
    state.characters = [];
    for (const word of words) {
      console.log(`Processing word: ${word}`);
      if (state.wordList.includes(word)) {
        state.animations.push(['add-text', word + ' ']);
        console.log(`Processing word module for: ${word}`, state.wordModules[word]);
        if (state.wordModules[word] && typeof state.wordModules[word] === 'function') {
          state.wordModules[word](state);
        } else {
          console.warn(`No valid module function for word: ${word}`);
        }
      } else {
        for (const [i, ch] of [...word].entries()) {
          console.log(`Processing letter: ${ch}`);
          const charText = (i === word.length - 1) ? (ch + ' ') : ch;
          state.animations.push(['add-text', charText]);
          if (state.alphabetModules[ch] && typeof state.alphabetModules[ch] === 'function') {
            state.alphabetModules[ch](state);
          } else {
            console.warn(`No valid module found for letter: ${ch}`);
          }
        }
      }
    }
    if (!state.pending && state.animations.length > 0) {
      state.pending = true;
      state.animate();
    }
  }

  function sendTextForProcessing(text) {
    fetch("/save_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
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

  document.getElementById('history-button').addEventListener('click', () => {
    historyPanel.classList.add('show');
    displayHistory();
  });

  document.getElementById('close-history').addEventListener('click', () => {
    historyPanel.classList.remove('show');
  });

  document.getElementById('history-list').addEventListener('click', (e) => {
    if (e.target.closest('.delete-btn')) {
      const id = e.target.closest('.delete-btn').dataset.id;
      if (confirm("Are you sure you want to delete this entry?")) {
        fetch(`/delete_history/${id}`, { method: "DELETE" })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              alert(data.error);
            } else {
              displayHistory();
            }
          })
          .catch(error => {
            console.error("Delete error:", error);
            alert("Could not delete entry.");
          });
      }
    }
  });

  document.getElementById('clearHistoryButton').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all conversion history?")) {
      fetch("/clear_history", { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            displayHistory();
          }
        })
        .catch(error => {
          console.error("Clear error:", error);
          alert("Could not clear history.");
        });
    }
  });

  micButton.addEventListener('click', () => {
    isRecording ? stopRecording() : startRecording();
  });

  document.getElementById('clearButton').addEventListener('click', () => {
    transcript.value = '';
    islBox.innerHTML = '';
    state.animations = [];
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'placeholder-animation';
    placeholderDiv.innerHTML = '<i data-feather="video"></i><p>Animation will appear here</p>';
    if (!state.scene) {
      animationContainer.innerHTML = '';
      animationContainer.appendChild(placeholderDiv);
      feather.replace();
    }
  });

  recognition.onstart = () => {
    console.log("Speech recognition started");
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
    if (final) sendTextForProcessing(final);
  };

  recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
    stopRecording();
  };

  recognition.onend = () => {
    if (isRecording) recognition.start();
  };

  async function init3DSystem() {
    try {
      if (!initThree()) throw new Error("Three.js initialization failed");
      await loadAlphabetModules();
      await loadWordModules();
      await loadModel(`/static/Models/${state.bot}/${state.bot}.glb`);
      window.addEventListener('resize', () => {
        if (state.camera && state.renderer) {
          state.camera.aspect = animationContainer.clientWidth / animationContainer.clientHeight;
          state.camera.updateProjectionMatrix();
          state.renderer.setSize(animationContainer.clientWidth, animationContainer.clientHeight);
        }
      });
      console.log("3D animation system initialized successfully");
      return true;
    } catch (error) {
      console.error('3D System initialization error:', error);
      return false;
    }
  }

  async function initApp() {
    feather.replace();
    const threeJsInitialized = await init3DSystem();
    if (!threeJsInitialized) {
      console.warn("Falling back to video-based animations");
    }
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  initApp();
});

