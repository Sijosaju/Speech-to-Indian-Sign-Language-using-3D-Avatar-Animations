export const A = (ref) => {

  let animations = []
  
  // Right hand - creating a circle with thumb and index finger
  // Index finger curved to meet thumb
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/8, "+"]);
  animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI/6, "+"]);
  animations.push(["mixamorigRightHandIndex3", "rotation", "z", Math.PI/6, "+"]);
  
  // Other fingers curled inward
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/2.5, "+"]);
  animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/2.5, "+"]);
  animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/2.5, "+"]);
  
  animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/2.5, "+"]);
  animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/2.5, "+"]);
  animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/2.5, "+"]);
  
  animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/2.5, "+"]);
  animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/2.5, "+"]);
  animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/2.5, "+"]);
  
  // Thumb position - creating a circle with index finger
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/4, "+"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "y", -Math.PI/6, "-"]);
  animations.push(["mixamorigRightHandThumb2", "rotation", "x", Math.PI/8, "+"]);
  animations.push(["mixamorigRightHandThumb3", "rotation", "x", Math.PI/8, "+"]);

  // Right hand positioning - slightly angled forward
  animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/12, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "x", Math.PI/12, "+"]);

  // Right arm positioning
  animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/12, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/12, "+"]);

  // Left hand - creating a circle with thumb and index finger (mirrored)
  // Index finger curved to meet thumb
  animations.push(["mixamorigLeftHandIndex1", "rotation", "z", -Math.PI/8, "-"]);
  animations.push(["mixamorigLeftHandIndex2", "rotation", "z", -Math.PI/6, "-"]);
  animations.push(["mixamorigLeftHandIndex3", "rotation", "z", -Math.PI/6, "-"]);
  
  // Other fingers curled inward
  animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", -Math.PI/2.5, "-"]);
  animations.push(["mixamorigLeftHandMiddle2", "rotation", "z", -Math.PI/2.5, "-"]);
  animations.push(["mixamorigLeftHandMiddle3", "rotation", "z", -Math.PI/2.5, "-"]);
  
  animations.push(["mixamorigLeftHandRing1", "rotation", "z", -Math.PI/2.5, "-"]);
  animations.push(["mixamorigLeftHandRing2", "rotation", "z", -Math.PI/2.5, "-"]);
  animations.push(["mixamorigLeftHandRing3", "rotation", "z", -Math.PI/2.5, "-"]);
  
  animations.push(["mixamorigLeftHandPinky1", "rotation", "z", -Math.PI/2.5, "-"]);
  animations.push(["mixamorigLeftHandPinky2", "rotation", "z", -Math.PI/2.5, "-"]);
  animations.push(["mixamorigLeftHandPinky3", "rotation", "z", -Math.PI/2.5, "-"]);
  
  // Thumb position - creating a circle with index finger
  animations.push(["mixamorigLeftHandThumb1", "rotation", "x", Math.PI/4, "+"]);
  animations.push(["mixamorigLeftHandThumb1", "rotation", "y", Math.PI/6, "+"]);
  animations.push(["mixamorigLeftHandThumb2", "rotation", "x", Math.PI/8, "+"]);
  animations.push(["mixamorigLeftHandThumb3", "rotation", "x", Math.PI/8, "+"]);

  // Left hand positioning - slightly angled forward
  animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI/12, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "x", Math.PI/12, "+"]);

  // Left arm positioning
  animations.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI/12, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "y", -Math.PI/12, "-"]);

  ref.animations.push(animations);

  // Reset animations
  animations = []

  // Reset right hand
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandIndex3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
  
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHandThumb2", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHandThumb3", "rotation", "x", 0, "-"]);

  animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);

  animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);

  // Reset left hand
  animations.push(["mixamorigLeftHandIndex1", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandIndex2", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandIndex3", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandMiddle2", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandMiddle3", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandRing1", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandRing2", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandRing3", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandPinky1", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandPinky2", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHandPinky3", "rotation", "z", 0, "+"]);
  
  animations.push(["mixamorigLeftHandThumb1", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftHandThumb1", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftHandThumb2", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftHandThumb3", "rotation", "x", 0, "-"]);

  animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "x", 0, "-"]);

  animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "y", 0, "+"]);

  ref.animations.push(animations);

  if(ref.pending === false){
    ref.pending = true;
    ref.animate();
  }
  
}