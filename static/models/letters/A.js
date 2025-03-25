window.A = (ref) => {
  let animations = [];

  // Left hand: Adjust fingers for 'A' (fist with thumb up)
  animations.push(["LeftHandIndex2", "rotation", "y", -Math.PI/9, "-"]);
  animations.push(["LeftHandMiddle3", "rotation", "y", -Math.PI/18, "-"]);
  animations.push(["LeftHandRing2", "rotation", "y", Math.PI/18, "+"]);
  animations.push(["LeftHandPinky2", "rotation", "y", Math.PI/9, "+"]);
  animations.push(["LeftHandThumb3", "rotation", "y", Math.PI/6, "+"]);

  animations.push(["LeftHand", "rotation", "x", Math.PI/2, "+"]);
  animations.push(["LeftHand", "rotation", "z", Math.PI/6, "+"]);
  animations.push(["LeftHand", "rotation", "y", Math.PI/9, "+"]);

  animations.push(["LeftForeArm", "rotation", "x", Math.PI/10, "+"]);
  animations.push(["LeftForeArm", "rotation", "z", -Math.PI/18, "-"]);

  animations.push(["LeftArm", "rotation", "x", -Math.PI/11, "-"]);

  // Right hand: Adjust fingers for 'A'
  animations.push(["RightHandMiddle2", "rotation", "z", Math.PI/2, "+"]);
  animations.push(["RightHandRing2", "rotation", "z", Math.PI/2, "+"]);
  animations.push(["RightHandPinky2", "rotation", "z", Math.PI/2, "+"]);
  animations.push(["RightHandThumb3", "rotation", "y", -Math.PI/2.5, "-"]);

  animations.push(["RightHand", "rotation", "x", -Math.PI/2, "-"]);
  animations.push(["RightHand", "rotation", "z", Math.PI/12, "+"]);

  animations.push(["RightForeArm", "rotation", "z", Math.PI/4, "+"]);
  animations.push(["RightForeArm", "rotation", "x", -Math.PI/36, "-"]);

  animations.push(["RightArm", "rotation", "x", -Math.PI/9, "-"]);
  animations.push(["RightArm", "rotation", "y", -Math.PI/72, "-"]);

  ref.animations.push(animations);

  // Reset to neutral position
  animations = [];

  animations.push(["LeftHandIndex2", "rotation", "y", 0, "+"]);
  animations.push(["LeftHandMiddle3", "rotation", "y", 0, "+"]);
  animations.push(["LeftHandRing2", "rotation", "y", 0, "-"]);
  animations.push(["LeftHandPinky2", "rotation", "y", 0, "-"]);
  animations.push(["LeftHandThumb3", "rotation", "y", 0, "-"]);

  animations.push(["LeftHand", "rotation", "x", 0, "-"]);
  animations.push(["LeftHand", "rotation", "z", 0, "-"]);
  animations.push(["LeftHand", "rotation", "y", 0, "-"]);

  animations.push(["LeftForeArm", "rotation", "x", 0, "-"]);
  animations.push(["LeftForeArm", "rotation", "z", 0, "+"]);

  animations.push(["LeftArm", "rotation", "x", 0, "+"]);

  animations.push(["RightHandMiddle2", "rotation", "z", 0, "-"]);
  animations.push(["RightHandRing2", "rotation", "z", 0, "-"]);
  animations.push(["RightHandPinky2", "rotation", "z", 0, "-"]);
  animations.push(["RightHandThumb3", "rotation", "y", 0, "+"]);

  animations.push(["RightHand", "rotation", "x", 0, "+"]);
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