import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";
import { GameObjectToken } from "../GameObject.js";
import { PhysicalGameObject, InternalPhysicalGameObject, PhysicalGameObjectOptions, createBody } from "./PhysicalGameObject.js";

export interface SphereOptions extends PhysicalGameObjectOptions {
  radius?: number;
}

export interface Sphere extends PhysicalGameObject {
}

export interface InternalSphere extends InternalPhysicalGameObject, Sphere {
}

export const SphereToken: GameObjectToken<SphereOptions, Sphere> = { kind: "sphere" };

export function createSphere(scene: THREE.Scene, world: RAPIER.World, options?: SphereOptions): InternalSphere {
  const radius = options?.radius ?? 0.5;

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius),
    new THREE.MeshStandardMaterial({ color: options?.color ?? 0xffffff }),
  );
  scene.add(mesh);

  const body = createBody(world, options);
  world.createCollider(RAPIER.ColliderDesc.ball(radius), body);

  return {
    visual: mesh,
    body,
    move: (x, y, z) => body.setTranslation({ x, y, z }, true),
  };
}
