export const youAnimation = (model) => {
    // Initial pose - hand near chest
    model.position.set(0, -0.1, 0);
    model.rotation.z = Math.PI/8;
  
    const timeline = [];
    
    // Animation 1: Point forward
    timeline.push({
      duration: 0.7,
      updates: [
        {
          object: model.position,
          property: 'z',
          from: 0,
          to: 0.3
        },
        {
          object: model.rotation,
          property: 'z',
          from: Math.PI/8,
          to: -Math.PI/8
        }
      ]
    });
  
    // Animation 2: Return slightly
    timeline.push({
      duration: 0.3,
      updates: [
        {
          object: model.position,
          property: 'z',
          from: 0.3,
          to: 0.2
        }
      ]
    });
  
    return {
      timeline,
      loop: false
    };
  };