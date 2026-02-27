import * as THREE from "three";
import { GameObject, InternalGameObject } from "./GameObject.js";

export interface Light extends GameObject {
}

export interface InternalLight extends InternalGameObject, Light {
}

export function createLight(scene: THREE.Scene): InternalLight {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  return {
    visual: light,
    move: (x, y, z) => light.position.set(x, y, z),
  };
}
