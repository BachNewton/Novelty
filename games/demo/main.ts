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
    position: { x: 0, y: 0, z: 0 },
    size: { x: 1, y: 1, z: 1 },
    color: 0xff0000
});

engine.add(Novelty.Sphere, {
    position: { x: 0, y: 2, z: 0 },
    radius: 1,
    color: 0x0000ff
});

engine.start();
