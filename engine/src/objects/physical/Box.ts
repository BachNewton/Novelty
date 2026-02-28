import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";
import { GameObjectToken, Clock } from "../GameObject.js";
import { PhysicalGameObject, InternalPhysicalGameObject, PhysicalGameObjectOptions, createBody, createMove } from "./PhysicalGameObject.js";

export interface BoxOptions extends PhysicalGameObjectOptions {
  size?: { x: number; y: number; z: number };
}

export interface Box extends PhysicalGameObject {
}

export interface InternalBox extends InternalPhysicalGameObject, Box {
}

export const BoxToken: GameObjectToken<BoxOptions, Box> = { kind: "box" };

export function createBox(scene: THREE.Scene, world: RAPIER.World, clock: Clock, options?: BoxOptions): InternalBox {
  const sx = options?.size?.x ?? 1;
  const sy = options?.size?.y ?? 1;
  const sz = options?.size?.z ?? 1;

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(sx, sy, sz),
    new THREE.MeshStandardMaterial({ color: options?.color ?? 0xffffff }),
  );
  scene.add(mesh);

  const body = createBody(world, options);
  world.createCollider(RAPIER.ColliderDesc.cuboid(sx / 2, sy / 2, sz / 2), body);

  return {
    visual: mesh,
    body,
    move: createMove(body, clock),
  };
}
