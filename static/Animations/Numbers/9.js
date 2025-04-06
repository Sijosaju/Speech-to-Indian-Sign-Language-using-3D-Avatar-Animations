
export const NINE = (ref) => {
    let animations = [];

    // Right arm: lifted near chest
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "y", Math.PI / 6, "+"]);

    // Forearm bent inward
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 3, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 10, "+"]);

    // Hand slightly tilted to show thumb
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 3.5, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 6, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 10, "-"]);

    // === Fingers curled into fist ===
    const curled = Math.PI / 1.5;
    ["Index", "Middle", "Ring", "Pinky"].forEach((finger) => {
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

    // === THUMB: make it fully visible ===
    // Extend thumb away and rotate outward
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", -Math.PI / 2.2, "-"]); // pull thumb away from palm
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", Math.PI / 2.2, "+"]);  // rotate outward
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", Math.PI / 4, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "z", -Math.PI / 6, "-"]);

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
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "z", 0, "+"]);

    ref.animations.push(animations);

    if (!ref.pending) {
        ref.pending = true;
        ref.animate();
    }
};
