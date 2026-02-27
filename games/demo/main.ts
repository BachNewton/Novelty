import { Novelty } from "@novelty/engine";

const engine = await Novelty.Engine();
engine.addLight();
engine.addBox();
engine.start();
