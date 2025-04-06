export const FIVE = (ref) => {
    // Animation array for number "5" position
    let animations = []
    
    // Right arm configuration - positioned to show "5"
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/3, "-"]);    // Raise arm up
    animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/12, "+"]);    // Slight rotation forward
    
    // Adjust forearm to position hand better for viewer
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/4, "+"]); // Adjust elbow bend
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/12, "+"]); // Slight tilt
    
    // Hand position - rotate to make palm face viewer better
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/2.5, "-"]);  // Rotate wrist to show palm
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/6, "-"]);    // Adjust hand orientation
    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI/6, "-"]);    // Tilt hand
    
    // All five fingers extended (for "5")
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "+"]); // Index finger straight
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "+"]); // Middle finger straight
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "+"]); // Ring finger straight
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "+"]); // Pinky finger straight
    
    // Thumb extended outward
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "+"]); 
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", -Math.PI/4, "+"]); // Extend thumb outward
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI/8, "+"]); // Straighten thumb
    
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
    
    // Ring finger
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "+"]);
    
    // Pinky finger
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "+"]);
    
    // Reset thumb
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "-"]);
    
    ref.animations.push(animations);
    
    // Start animation if not already pending
    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
  }