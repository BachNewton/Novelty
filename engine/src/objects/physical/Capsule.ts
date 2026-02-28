import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";
import { GameObjectToken } from "../GameObject.js";
import { PhysicalGameObject, InternalPhysicalGameObject, PhysicalGameObjectOptions, createBody } from "./PhysicalGameObject.js";

export interface CapsuleOptions extends PhysicalGameObjectOptions {
  radius?: number;
  length?: number;
}

export interface Capsule extends PhysicalGameObject {
}

export interface InternalCapsule extends InternalPhysicalGameObject, Capsule {
}

export const CapsuleToken: GameObjectToken<CapsuleOptions, Capsule> = { kind: "capsule" };

export function createCapsule(scene: THREE.Scene, world: RAPIER.World, options?: CapsuleOptions): InternalCapsule {
  const radius = options?.radius ?? 0.5;
  const length = options?.length ?? 1;

  const mesh = new THREE.Mesh(
    new THREE.CapsuleGeometry(radius, length),
    new THREE.MeshStandardMaterial({ color: options?.color ?? 0xffffff }),
  );
  scene.add(mesh);

  const body = createBody(world, options);
  world.createCollider(RAPIER.ColliderDesc.capsule(length / 2, radius), body);

  return {
    visual: mesh,
    body,
    move: (x, y, z) => body.setTranslation({ x, y, z }, true),
  };
}
