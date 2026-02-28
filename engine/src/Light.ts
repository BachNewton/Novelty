import * as THREE from "three";
import { GameObject, InternalGameObject, GameObjectToken, GameObjectOptions } from "./GameObject.js";

export interface LightOptions extends GameObjectOptions {
}

export interface Light extends GameObject {
}

export interface InternalLight extends InternalGameObject, Light {
}

export const LightToken: GameObjectToken<LightOptions, Light> = { kind: "light" };

export function createLight(scene: THREE.Scene, options?: LightOptions): InternalLight {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  if (options?.position) {
    light.position.set(options.position.x, options.position.y, options.position.z);
  } else {
    light.position.set(5, 10, 5);
  }
  scene.add(light);

  return {
    visual: light,
    move: (x, y, z) => light.position.set(x, y, z),
  };
}
