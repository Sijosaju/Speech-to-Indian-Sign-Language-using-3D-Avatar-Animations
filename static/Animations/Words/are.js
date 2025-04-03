export const areAnimation = (model) => {
    // Initial pose - hands close to body
    model.scale.set(0.9, 0.9, 0.9);
    model.position.x = -0.2;
  
    const timeline = [];
    
    // Animation 1: Hands move outward
    timeline.push({
      duration: 1.2,
      updates: [
        {
          object: model.position,
          property: 'x',
          from: -0.2,
          to: 0.2,
          easing: THREE.Easing.Quadratic.Out
        },
        {
          object: model.scale,
          property: 'x',
          from: 0.9,
          to: 1.1
        }
      ]
    });
  
    return {
      timeline,
      loop: false
    };
  };