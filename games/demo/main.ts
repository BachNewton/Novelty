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

const player = engine.add(Novelty.Box, {
    position: { x: 0, y: 0, z: 0 },
    size: { x: 1, y: 1, z: 1 },
    color: 0xff0000
});

engine.add(Novelty.Sphere, {
    position: { x: 0, y: 2, z: 0 },
    radius: 1,
    color: 0x0000ff
});

engine.add(Novelty.Capsule, {
    position: { x: 2, y: 2, z: 0 },
    radius: 0.5,
    length: 1,
    color: 0x00ff00
});

engine.add(Novelty.Capsule, {
    position: { x: -2, y: 2, z: 0 },
    radius: 0.5,
    length: 1,
    color: 0xffff00
});

engine.onUpdate((input) => {
    if (input.held(Novelty.Key.W)) player.move(0, 0, -5);
    if (input.held(Novelty.Key.S)) player.move(0, 0, 5);
    if (input.held(Novelty.Key.A)) player.move(-5, 0, 0);
    if (input.held(Novelty.Key.D)) player.move(5, 0, 0);
});

engine.start();
