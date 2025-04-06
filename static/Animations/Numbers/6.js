
// export const SIX = (ref) => {
//     let animations = [];

//     // Arm up
//     animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/3, "-"]);
//     animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/12, "+"]);

//     animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/4, "+"]);
//     animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/12, "+"]);

//     // Hand facing viewer
//     animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/3, "-"]);
//     animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/6, "-"]);
//     animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI/6, "-"]);

//     // Extend pinky only
//     animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "+"]);

//     // Curl all other fingers
//     const curledFingers = ["Index", "Middle", "Ring"];
//     for (const finger of curledFingers) {
//         animations.push([`mixamorigRightHand${finger}1`, "rotation", "z", Math.PI / 1.8, "+"]);
//         animations.push([`mixamorigRightHand${finger}2`, "rotation", "z", Math.PI / 1.8, "+"]);
//         animations.push([`mixamorigRightHand${finger}3`, "rotation", "z", Math.PI / 1.8, "+"]);
//     }

//     // Thumb curled in
//     animations.push(["mixamorigRightHandThumb1", "rotation", "z", Math.PI / 4, "+"]);
//     animations.push(["mixamorigRightHandThumb2", "rotation", "x", Math.PI / 4, "+"]);
//     animations.push(["mixamorigRightHandThumb3", "rotation", "x", Math.PI / 6, "+"]);

//     // Simulate drawing a 6 with pinky using wrist motion
//     // Step 1: Move hand slightly right and down
//     animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/8, "-"]);
//     animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI/12, "-"]);

//     ref.animations.push(animations);

//     // Step 2: Curve leftward
//     animations = [];
//     animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/10, "+"]);
//     animations.push(["mixamorigRightHand", "rotation", "x", Math.PI/18, "+"]);
//     ref.animations.push(animations);

//     // Step 3: Hook inward
//     animations = [];
//     animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/20, "-"]);
//     animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/10, "+"]);
//     ref.animations.push(animations);

//     // Reset all
//     animations = [];

//     // Reset arm
//     animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
//     animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
//     animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
//     animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);

//     // Reset hand
//     animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
//     animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
//     animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);

//     // Reset all fingers
//     const allFingers = ["Index", "Middle", "Ring", "Pinky"];
//     for (const finger of allFingers) {
//         animations.push([`mixamorigRightHand${finger}1`, "rotation", "z", 0, "-"]);
//         animations.push([`mixamorigRightHand${finger}2`, "rotation", "z", 0, "-"]);
//         animations.push([`mixamorigRightHand${finger}3`, "rotation", "z", 0, "-"]);
//     }

//     // Reset thumb
//     animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "-"]);
//     animations.push(["mixamorigRightHandThumb2", "rotation", "x", 0, "-"]);
//     animations.push(["mixamorigRightHandThumb3", "rotation", "x", 0, "-"]);

//     ref.animations.push(animations);

//     if (ref.pending === false) {
//         ref.pending = true;
//         ref.animate();
//     }
// };
export const SIX = (ref) => {
    let animations = [];

    // Arm and hand positioning
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "y", -Math.PI / 10, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 4, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 10, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 2.5, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 8, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 8, "-"]);

    // Finger setup
    const curled = ["Index", "Middle", "Ring"];
    for (let f of curled) {
        animations.push([`mixamorigRightHand${f}1`, "rotation", "z", Math.PI / 1.8, "+"]);
        animations.push([`mixamorigRightHand${f}2`, "rotation", "z", Math.PI / 1.8, "+"]);
        animations.push([`mixamorigRightHand${f}3`, "rotation", "z", Math.PI / 1.8, "+"]);
    }

    // Pinky extended
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "+"]);

    // Thumb natural bend
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", Math.PI / 3, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "x", Math.PI / 3, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "x", Math.PI / 6, "+"]);

    ref.animations.push(animations);

    // Anti-clockwise "6" drawing path (mirrored loop)
    const path = [
        { x: -0.1, y: -0.1, z: -0.1 },
        { x: -0.05, y: -0.15, z: 0 },
        { x: 0.05, y: -0.1, z: 0.05 },
        { x: 0.1, y: 0, z: 0.1 },
        { x: 0, y: 0.1, z: 0.05 },
        { x: -0.1, y: 0.15, z: 0 },
    ];

    for (const frame of path) {
        animations = [];
        animations.push(["mixamorigRightHand", "rotation", "x", frame.x, "+"]);
        animations.push(["mixamorigRightHand", "rotation", "y", frame.y, "+"]);
        animations.push(["mixamorigRightHand", "rotation", "z", frame.z, "+"]);
        ref.animations.push(animations);
    }

    // Reset
    animations = [];

    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

    for (let f of ["Index", "Middle", "Ring", "Pinky"]) {
        animations.push([`mixamorigRightHand${f}1`, "rotation", "z", 0, "-"]);
        animations.push([`mixamorigRightHand${f}2`, "rotation", "z", 0, "-"]);
        animations.push([`mixamorigRightHand${f}3`, "rotation", "z", 0, "-"]);
    }

    animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "x", 0, "-"]);

    ref.animations.push(animations);

    if (!ref.pending) {
        ref.pending = true;
        ref.animate();
    }
};
