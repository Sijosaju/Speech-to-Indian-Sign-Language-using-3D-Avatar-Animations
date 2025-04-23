export const ARRIVE = (ref) => {
    let animations = [];

    // Starting position - both hands in neutral position
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/6, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "y", -Math.PI/8, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI/12, "+"]);
    
    // Right hand prepares to move (slightly bent)
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/5, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/4, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/8, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/6, "-"]);

    ref.animations.push(animations);

    // Movement phase - right hand moves toward left hand
    animations = [];
    animations.push(["mixamorigRightArm", "rotation", "y", -Math.PI/8, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/12, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/12, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/12, "+"]);

    ref.animations.push(animations);

    // Contact phase - hands meet
    animations = [];
    animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

    // Left hand slight adjustment for contact
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);

    ref.animations.push(animations);

    // Return to neutral position
    animations = [];
    animations.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}