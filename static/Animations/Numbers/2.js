
export const TWO = (ref) => {
    // Animation array for number "2" position
    let animations = []
    
    // Right arm configuration - positioned to show "2"
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/3, "-"]);    // Raise arm up
    animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/12, "+"]);    // Slight rotation forward
    
    // Adjust forearm to position hand better for viewer
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/4, "+"]); // Adjust elbow bend
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/12, "+"]); // Slight tilt
    
    // Hand position - rotate to make palm face viewer better (similar to L animation)
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/2.5, "-"]);  // Rotate wrist to show palm
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/6, "-"]);    // Adjust hand orientation
    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI/6, "-"]);    // Tilt hand
    
    // Index and middle fingers extended (for "2"), other fingers curled
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "+"]); // Index finger straight
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "+"]); // Middle finger straight
    
    // Curl ring finger
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/1.8, "+"]);
    
    // Curl pinky finger
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/1.8, "+"]);
    
    // Position thumb against side of hand
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", Math.PI/4, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", -Math.PI/4, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI/4, "-"]);
    
    ref.animations.push(animations);
    
    // Reset to neutral position
    animations = []
    
    // Reset right arm configuration
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
    
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    
    // Reset hand position
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
    
    // Reset all fingers
    // Index finger
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "+"]);
    
    // Middle finger
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    
    // Reset ring finger
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    
    // Reset pinky finger
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    
    // Reset thumb
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "z", 0, "-"]);
    
    ref.animations.push(animations);
    
    // Start animation if not already pending
    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
  }