
document.addEventListener('DOMContentLoaded', () => {
  // Debug mode
  const DEBUG = true;
  
  // Elements
  const micButton = document.getElementById('micButton');
  const transcript = document.getElementById('transcript');
  const islBox = document.getElementById('islBox');
  const animationContainer = document.getElementById('animationContainer');
  
  // Three.js variables
  let scene, camera, renderer, mixer, currentModel;
  
  // Speech recognition
  let recognition;
  let isRecording = false;

  // Animation dataset (to be populated dynamically)
  const animationDataset = {};

  // Load animation scripts dynamically
  const letters = ['A', 'B', 'O', 'T', 'U'];
  const words = ['are', 'how', 'you'];

  function loadAnimationScripts() {
    // Load letter animations
    letters.forEach(letter => {
      const script = document.createElement('script');
      script.src = `/static/models/letters/${letter}.js`;
      script.onload = () => {
        log(`Loaded ${letter}.js`);
        animationDataset[letter.toLowerCase()] = window[letter];
        log(`animationDataset[${letter.toLowerCase()}] set to:`, animationDataset[letter.toLowerCase()]);
      };
      script.onerror = () => logError(`Failed to load ${letter}.js`);
      document.head.appendChild(script);
    });

    // Load word animations
    words.forEach(word => {
      const script = document.createElement('script');
      script.src = `/static/models/words/${word}.js`;
      script.onload = () => {
        log(`Loaded ${word}.js`);
        animationDataset[word.toLowerCase()] = window[word.toUpperCase()];
        log(`animationDataset[${word.toLowerCase()}] set to:`, animationDataset[word.toLowerCase()]);
      };
      script.onerror = () => logError(`Failed to load ${word}.js`);
      document.head.appendChild(script);
    });
  }

  // 1. INITIALIZE THREE.JS
  function initThreeJS() {
    if (scene) return;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    camera = new THREE.PerspectiveCamera(
      75, 
      animationContainer.offsetWidth / animationContainer.offsetHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 3); // View from the front
    camera.lookAt(0, 0, 0);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(animationContainer.offsetWidth, animationContainer.offsetHeight);
    animationContainer.innerHTML = '';
    animationContainer.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load the single GLB model
    loadModel();
  }

  function loadModel() {
    new THREE.GLTFLoader().load(
      '/static/models/appu.glb',
      (gltf) => {
        currentModel = gltf.scene;
        // Adjust position, scale, and rotation
        currentModel.scale.set(1.2, 1.2, 1.2); // Slightly larger
        currentModel.position.set(0, -1, 0); // Move up to center in view
        currentModel.rotation.set(0, 0, 0); // Restore the working rotation
        scene.add(currentModel);
        mixer = new THREE.AnimationMixer(currentModel);

        // Debug: Log bone names and their hierarchy
        currentModel.traverse((node) => {
          if (node.isBone) {
            let hierarchy = node.name;
            let parent = node.parent;
            while (parent && parent.name) {
              hierarchy = `${parent.name} > ${hierarchy}`;
              parent = parent.parent;
            }
            log(`Bone hierarchy: ${hierarchy}`);
          }
        });

        // Start render loop
        const clock = new THREE.Clock();
        const animate = () => {
          const delta = clock.getDelta();
          if (mixer) mixer.update(delta);
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };
        animate();
      },
      undefined,
      (error) => {
        logError('Error loading model:', error);
        showPlaceholder('Error loading model');
      }
    );
  }

  // 2. SPEECH RECOGNITION
  function initSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
      showError("Browser doesn't support speech recognition. Use Chrome or Edge.");
      return null;
    }

    const recog = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = 'en-US';

    // Event handlers
    recog.onstart = () => {
      log('Recording started');
      isRecording = true;
      updateMicButton(true);
    };

    recog.onresult = (event) => {
      const results = [];
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          results.push(event.results[i][0].transcript);
        }
      }
      
      if (results.length > 0) {
        const finalText = results.join(' ');
        transcript.value += finalText + ' ';
        log('Final transcript:', finalText);
        sendTextForProcessing(finalText);
      }
    };

    recog.onerror = (event) => {
      logError('Recognition error:', event.error);
      if (event.error === 'not-allowed') {
        showError("Microphone access denied. Allow permissions in browser settings.");
      }
      stopRecording();
    };

    recog.onend = () => {
      log('Recording ended');
      if (isRecording) {
        log('Restarting recognition...');
        setTimeout(() => recognition.start(), 100);
      }
    };

    return recog;
  }

  // 3. TEXT PROCESSING AND ISL CONVERSION
  async function sendTextForProcessing(text) {
    try {
      islBox.innerHTML = '<div class="loading">Processing to ISL...</div>';
      
      const response = await fetch("http://127.0.0.1:5000/save_text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
      const data = await response.json();
      
      if (!data.isl_structure) {
        throw new Error("No ISL structure returned");
      }

      log("ISL tokens:", data.isl_structure);
      islBox.innerHTML = '';
      await animateISL(data.isl_structure);
      
    } catch (error) {
      logError("Processing error:", error);
      islBox.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
  }

  // 4. ANIMATION SYSTEM
  async function animateISL(islText) {
    const tokens = islText.split(' ').filter(t => t.trim());
    initThreeJS();
    
    for (const token of tokens) {
      const tokenLower = token.toLowerCase();
      if (animationDataset[tokenLower]) {
        // Whole word animation exists
        await displayAndAnimateToken(token, tokenLower);
      } else {
        // Split into letters
        for (const char of tokenLower) {
          if (animationDataset[char]) {
            await displayAndAnimateToken(char, char);
          } else {
            await displayAndAnimateToken(char, null);
          }
        }
      }
      // Add space between tokens
      islBox.innerHTML += ' ';
      await delay(200); // Pause between words
    }
  }

  async function displayAndAnimateToken(text, animationKey) {
    // Display text letter-by-letter
    for (const char of text) {
      islBox.innerHTML += `<span class="isl-token">${char}</span>`;
      await delay(100); // Delay for letter-by-letter display
    }

    // Play animation if available
    if (animationKey && animationDataset[animationKey]) {
      log(`Playing animation for: ${animationKey}`);
      const animationFunc = animationDataset[animationKey];

      // Wait for the model to load
      while (!currentModel) {
        log('Waiting for model to load...');
        await delay(100);
      }

      // Ensure the model is added to the scene
      if (!scene.children.includes(currentModel)) {
        log('Model not in scene, adding now...');
        scene.add(currentModel);
      }

      const animationRef = {
        animations: [],
        pending: false,
        animate: async function() {
          if (this.animations.length === 0) {
            this.pending = false;
            log(`Finished animations for: ${animationKey}`);
            return;
          }

          const anims = this.animations.shift();
          const actions = [];

          anims.forEach(([boneName, property, axis, value, direction]) => {
            const bone = currentModel.getObjectByName(boneName);
            if (bone) {
              log(`Found bone: ${boneName}`); // Debug: Confirm bone is found
              const startValue = bone[property][axis];
              const endValue = direction === '+' ? value : -value;
              // Construct the full path based on the hierarchy
              // For now, assume the hierarchy is Scene > Armature > boneName
              // Adjust this based on the hierarchy logs
              const trackPath = `Armature.${boneName}.${property}.${axis}`;
              const keyframe = new THREE.NumberKeyframeTrack(
                trackPath,
                [0, 1.5], // Duration 1.5 seconds
                [startValue, endValue]
              );
              const clip = new THREE.AnimationClip(null, 1.5, [keyframe]);
              const action = mixer.clipAction(clip);
              action.setLoop(THREE.LoopOnce);
              action.clampWhenFinished = true;
              actions.push(action);
            } else {
              logError(`Bone not found: ${boneName}`);
            }
          });

          if (actions.length > 0) {
            log(`Playing ${actions.length} actions for: ${animationKey}`);
            actions.forEach(action => action.play());
            await new Promise(resolve => {
              mixer.addEventListener('finished', function onFinished() {
                mixer.removeEventListener('finished', onFinished);
                log(`Animation step completed for: ${animationKey}`);
                resolve();
              });
            });
          } else {
            log(`No actions to play for: ${animationKey}`);
          }

          this.animate();
        }
      };

      animationFunc(animationRef);
      await delay(1500); // Wait for animation to complete
    } else {
      log(`No animation found for: ${animationKey || text}`);
      await delay(1500); // Default delay if no animation
    }
  }

  // 5. UTILITY FUNCTIONS
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function showPlaceholder(char) {
    animationContainer.innerHTML = `
      <div style="
        font-size: 100px;
        text-align: center;
        line-height: ${animationContainer.offsetHeight}px;
      ">
        ${char.toUpperCase()}
      </div>
    `;
  }

  // 6. UI CONTROLS
  micButton.addEventListener('click', () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  });

  function startRecording() {
    log('Starting recording...');
    if (!recognition) {
      recognition = initSpeechRecognition();
    }
    
    if (recognition) {
      transcript.value = '';
      recognition.start();
      updateMicButton(true);
    }
  }

  function stopRecording() {
    log('Stopping recording...');
    isRecording = false;
    if (recognition) {
      recognition.stop();
    }
    updateMicButton(false);
  }

  function updateMicButton(recording) {
    micButton.innerHTML = recording
      ? '<i data-feather="mic-off"></i> Stop Recording'
      : '<i data-feather="mic"></i> Start Recording';
    micButton.classList.toggle('recording', recording);
    feather.replace();
  }

  function showError(message) {
    console.error(message);
    alert(message);
  }

  function log(...args) {
    if (DEBUG) console.log('[DEBUG]', ...args);
  }

  function logError(...args) {
    console.error('[ERROR]', ...args);
  }

  // Initialize
  loadAnimationScripts();
  feather.replace();
});