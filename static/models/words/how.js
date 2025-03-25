export const howAnimation = (model) => {
    // Initial pose - hand tilted forward
    model.rotation.x = Math.PI / 4;
    model.position.y = 0.3;
  
    // Create animation timeline
    const timeline = [];
    
    // Animation 1: Hand moves upward while tilting back
    timeline.push({
      duration: 0.8,
      updates: [
        { 
          object: model.rotation,
          property: 'x',
          from: Math.PI/4,
          to: -Math.PI/8
        },
        {
          object: model.position,
          property: 'y',
          from: 0.3,
          to: 0.1
        }
      ]
    });
  
    // Animation 2: Small questioning wiggle
    timeline.push({
      duration: 0.4,
      updates: [
        {
          object: model.rotation,
          property: 'z',
          from: 0,
          to: Math.PI/12,
          easing: THREE.Easing.Quadratic.InOut
        }
      ]
    });
  
    return {
      timeline,
      loop: false
    };
  };