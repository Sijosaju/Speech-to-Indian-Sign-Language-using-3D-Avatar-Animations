// export const SEVEN = (ref) => {
//     // Animation array for number "7" position in Indian Sign Language
//     let animations = []
    
//     // Right arm configuration - positioned to show "7"
//     animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/3, "-"]);    // Raise arm up
//     animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/12, "+"]);    // Slight rotation forward
    
//     // Adjust forearm to position hand better for viewer
//     animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/4, "+"]); // Adjust elbow bend
//     animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/12, "+"]); // Slight tilt
    
//     // Hand position - rotate to make palm face viewer
//     animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/2.5, "-"]);  // Rotate wrist to show palm
//     animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/6, "-"]);    // Adjust hand orientation
//     animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI/6, "-"]);    // Tilt hand
    
//     // In ISL, "7" is shown with thumb, index, and pinky extended, other fingers curled
    
//     // Extend index finger
//     animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandIndex3", "rotation", "z", 0, "+"]);
    
//     // Extend pinky finger
//     animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "+"]);
    
//     // Curl middle finger
//     animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/1.8, "+"]);
//     animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/1.8, "+"]);
//     animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/1.8, "+"]);
    
//     // Curl ring finger
//     animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/1.8, "+"]);
//     animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/1.8, "+"]);
//     animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/1.8, "+"]);
    
//     // Extend thumb outward
//     animations.push(["mixamorigRightHandThumb1", "rotation", "z", -Math.PI/6, "-"]);
//     animations.push(["mixamorigRightHandThumb1", "rotation", "y", Math.PI/4, "+"]);
//     animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
//     animations.push(["mixamorigRightHandThumb3", "rotation", "z", 0, "+"]);
    
//     ref.animations.push(animations);
    
//     // Reset to neutral position
//     animations = []
    
//     // Reset right arm configuration
//     animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
//     animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
    
//     animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
//     animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    
//     // Reset hand position
//     animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
//     animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
    
//     // Reset all fingers
//     // Reset index finger
//     animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandIndex3", "rotation", "z", 0, "+"]);
    
//     // Reset middle finger
//     animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
//     animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
//     animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    
//     // Reset ring finger
//     animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
//     animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
//     animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    
//     // Reset pinky finger
//     animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "+"]);
    
//     // Reset thumb
//     animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "-"]);
//     animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
//     animations.push(["mixamorigRightHandThumb3", "rotation", "z", 0, "+"]);
    
//     ref.animations.push(animations);
    
//     // Start animation if not already pending
//     if(ref.pending === false){
//         ref.pending = true;
//         ref.animate();
//     }
// }
export const SEVEN = (ref) => {
    let animations = [];

    // Raise arm to shoulder level
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "y", Math.PI / 18, "+"]);

    // Slight elbow bend
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 4, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 16, "+"]);

    // Rotate hand to be upright and slightly tilted toward face
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 3, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 12, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 10, "-"]);

    // === Fingers ===

    // Thumb: curved outward like in the "C" shape
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", -Math.PI / 4, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", Math.PI / 3.0, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "x", Math.PI / 10, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "z", Math.PI / 8, "+"]);

    // Index: curved forward
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", -Math.PI / 12, "-"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI / 8, "+"]);
    animations.push(["mixamorigRightHandIndex3", "rotation", "z", Math.PI / 8, "+"]);

    // Other fingers: curled in (middle, ring, pinky)
    const curled = Math.PI / 1.5;
    ["Middle", "Ring", "Pinky"].forEach((finger) => {
        [1, 2, 3].forEach((joint) => {
            animations.push([
                `mixamorigRightHand${finger}${joint}`,
                "rotation",
                "z",
                curled,
                "+",
            ]);
        });
    });

    ref.animations.push(animations);

    // === Reset ===
    animations = [];

    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);

    // Reset all fingers
    ["Index", "Middle", "Ring", "Pinky"].forEach((finger) => {
        [1, 2, 3].forEach((joint) => {
            animations.push([
                `mixamorigRightHand${finger}${joint}`,
                "rotation",
                "z",
                0,
                "-",
            ]);
        });
    });

    animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "z", 0, "-"]);

    ref.animations.push(animations);

    if (!ref.pending) {
        ref.pending = true;
        ref.animate();
    }
};
