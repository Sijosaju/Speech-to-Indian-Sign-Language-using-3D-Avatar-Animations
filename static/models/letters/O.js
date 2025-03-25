window.O = (ref) => {
    let animations = [];
  
    // Right hand: Form an 'O' shape
    animations.push(["RightHandIndex1", "rotation", "z", Math.PI/3, "+"]);
    animations.push(["RightHandMiddle2", "rotation", "z", Math.PI/3, "+"]);
    animations.push(["RightHandRing2", "rotation", "z", Math.PI/3, "+"]);
    animations.push(["RightHandPinky2", "rotation", "z", Math.PI/3, "+"]);
    animations.push(["RightHandThumb3", "rotation", "y", -Math.PI/4, "-"]);
  
    animations.push(["RightHand", "rotation", "x", 0, "+"]);
    animations.push(["RightHand", "rotation", "y", 0, "+"]);
    animations.push(["RightHand", "rotation", "z", 0, "+"]);
  
    animations.push(["RightForeArm", "rotation", "z", Math.PI/4, "+"]);
    animations.push(["RightForeArm", "rotation", "x", -Math.PI/6, "-"]);
    animations.push(["RightArm", "rotation", "x", -Math.PI/4, "-"]);
    animations.push(["RightArm", "rotation", "y", -Math.PI/6, "-"]);
  
    // Left hand: Neutral
    animations.push(["LeftHand", "rotation", "x", 0, "+"]);
    animations.push(["LeftHand", "rotation", "y", 0, "+"]);
    animations.push(["LeftHand", "rotation", "z", 0, "+"]);
    animations.push(["LeftForeArm", "rotation", "x", 0, "+"]);
    animations.push(["LeftForeArm", "rotation", "z", 0, "+"]);
    animations.push(["LeftArm", "rotation", "x", 0, "+"]);
  
    ref.animations.push(animations);
  
    // Reset to neutral
    animations = [];
  
    animations.push(["RightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["RightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["RightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["RightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["RightHandThumb3", "rotation", "y", 0, "+"]);
  
    animations.push(["RightHand", "rotation", "x", 0, "-"]);
    animations.push(["RightHand", "rotation", "y", 0, "+"]);
    animations.push(["RightHand", "rotation", "z", 0, "-"]);
  
    animations.push(["RightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["RightForeArm", "rotation", "x", 0, "+"]);
    animations.push(["RightArm", "rotation", "x", 0, "+"]);
    animations.push(["RightArm", "rotation", "y", 0, "+"]);
  
    ref.animations.push(animations);
  
    if (ref.pending === false) {
      ref.pending = true;
      ref.animate();
    }
  };