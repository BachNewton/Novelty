import { Novelty } from "@novelty/engine";

const engine = await Novelty.Engine();

engine.add(Novelty.Light);

const box = engine.add(Novelty.Box, {
    position: { x: 0, y: -1, z: 0 },
    size: { x: 3, y: 1, z: 3 }
});

const sphere = engine.add(Novelty.Sphere, {
    position: { x: 0, y: 1, z: 0 },
    radius: 1
});

engine.start();
