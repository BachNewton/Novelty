import { Novelty } from "@novelty/engine";

const engine = await Novelty.Engine();

engine.add(Novelty.Light);

// Floor
engine.add(Novelty.Box, {
    fixed: true,
    position: { x: 0, y: -2, z: 0 },
    size: { x: 25, y: 0.5, z: 25 },
    color: 0xffffff
});

engine.add(Novelty.Box, {
    position: { x: 4, y: 0, z: -4 },
    size: { x: 2, y: 2, z: 2 },
    color: 0x0000ff
});

engine.add(Novelty.Sphere, {
    position: { x: -3, y: 2, z: -3 },
    radius: 1,
    color: 0x00ff00
});

engine.add(Novelty.Capsule, {
    position: { x: 3, y: 2, z: 3 },
    radius: 0.5,
    length: 1,
    color: 0xffff00
});

const player = engine.add(Novelty.Capsule, {
    position: { x: 0, y: 0, z: 0 },
    radius: 0.5,
    length: 1,
    color: 0xff0000,
    lockRotation: true
});

let fps = false;

engine.onUpdate((input, camera) => {
    if (input.pressed(Novelty.Key.Backtick)) {
        fps = !fps;
        if (fps) engine.setCamera(Novelty.FPSCamera, { target: player, height: 0.8 });
        else engine.setCamera(Novelty.OrbitCamera);
    }

    if (input.held(Novelty.Key.W)) player.move(...camera.forward(5));
    if (input.held(Novelty.Key.S)) player.move(...camera.back(5));
    if (input.held(Novelty.Key.A)) player.move(...camera.left(5));
    if (input.held(Novelty.Key.D)) player.move(...camera.right(5));
});

engine.start();
