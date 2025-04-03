window.O = (ref) => {
  let animations = [];

  // Right hand: Form an 'O' shape
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightHandThumb3", "rotation", "y", -Math.PI/4, "-"]);

  animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

  animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/4, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", -Math.PI/6, "-"]);

  // Left hand: Neutral
  animations.push(["mixamorigLeftHand", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);

  ref.animations.push(animations);

  // Reset to neutral
  animations = [];

  animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandThumb3", "rotation", "y", 0, "+"]);

  animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);

  animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);

  ref.animations.push(animations);

  if (ref.pending === false) {
    ref.pending = true;
    ref.animate();
  }
};