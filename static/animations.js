// Animation for the letter "A"
export const createAnimationA = (avatar) => {
    const animations = [];
  
    // Left hand rotations
    animations.push({ bone: 'mixamorigLeftHandIndex1', rotation: { y: -Math.PI / 9 } });
    animations.push({ bone: 'mixamorigLeftHandMiddle1', rotation: { y: -Math.PI / 18 } });
    animations.push({ bone: 'mixamorigLeftHandRing1', rotation: { y: Math.PI / 18 } });
    animations.push({ bone: 'mixamorigLeftHandPinky1', rotation: { y: Math.PI / 9 } });
  
    // Left hand position
    animations.push({ bone: 'mixamorigLeftHand', rotation: { x: Math.PI / 2, z: Math.PI / 6, y: Math.PI / 9 } });
  
    // Left forearm rotations
    animations.push({ bone: 'mixamorigLeftForeArm', rotation: { x: Math.PI / 10, z: -Math.PI / 18 } });
  
    // Left arm rotations
    animations.push({ bone: 'mixamorigLeftArm', rotation: { x: -Math.PI / 11 } });
  
    // Right hand rotations
    animations.push({ bone: 'mixamorigRightHandMiddle1', rotation: { z: Math.PI / 2 } });
    animations.push({ bone: 'mixamorigRightHandMiddle2', rotation: { z: Math.PI / 2 } });
    animations.push({ bone: 'mixamorigRightHandMiddle3', rotation: { z: Math.PI / 2 } });
  
    // Right hand position
    animations.push({ bone: 'mixamorigRightHand', rotation: { x: -Math.PI / 2, z: Math.PI / 12 } });
  
    // Right forearm rotations
    animations.push({ bone: 'mixamorigRightForeArm', rotation: { z: Math.PI / 4, x: -Math.PI / 36 } });
  
    // Right arm rotations
    animations.push({ bone: 'mixamorigRightArm', rotation: { x: -Math.PI / 9, y: -Math.PI / 72 } });
  
    return animations;
  };
  
  // Animation for the letter "B"
  export const createAnimationB = (avatar) => {
    const animations = [];
    // Define bone rotations for "B"...
    return animations;
  };
  
  // Animation for the letter "C"
  export const createAnimationC = (avatar) => {
    const animations = [];
    // Define bone rotations for "C"...
    return animations;
  };
  
  // Add more animations for other letters/words...