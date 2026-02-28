import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";
import { GameObjectToken, Clock } from "../GameObject.js";
import { PhysicalGameObject, InternalPhysicalGameObject, PhysicalGameObjectOptions, createBody, createMove } from "./PhysicalGameObject.js";

export interface SphereOptions extends PhysicalGameObjectOptions {
  radius?: number;
}

export interface Sphere extends PhysicalGameObject {
}

export interface InternalSphere extends InternalPhysicalGameObject, Sphere {
}

export const SphereToken: GameObjectToken<SphereOptions, Sphere> = { kind: "sphere" };

export function createSphere(scene: THREE.Scene, world: RAPIER.World, clock: Clock, options?: SphereOptions): InternalSphere {
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
    move: createMove(body, clock),
  };
}
