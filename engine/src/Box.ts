import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";
import { PhysicalGameObject, InternalPhysicalGameObject, GameObjectToken, PhysicalGameObjectOptions } from "./GameObject.js";

export interface BoxOptions extends PhysicalGameObjectOptions {
  size?: { x: number; y: number; z: number };
}

export interface Box extends PhysicalGameObject {
}

export interface InternalBox extends InternalPhysicalGameObject, Box {
}

export const BoxToken: GameObjectToken<BoxOptions, Box> = { kind: "box" };

export function createBox(scene: THREE.Scene, world: RAPIER.World, options?: BoxOptions): InternalBox {
  const sx = options?.size?.x ?? 1;
  const sy = options?.size?.y ?? 1;
  const sz = options?.size?.z ?? 1;

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(sx, sy, sz),
    new THREE.MeshStandardMaterial({ color: options?.color ?? 0xffffff }),
  );
  scene.add(mesh);

  const bodyDesc = RAPIER.RigidBodyDesc.fixed();
  const body = world.createRigidBody(bodyDesc);

  const colliderDesc = RAPIER.ColliderDesc.cuboid(sx / 2, sy / 2, sz / 2);
  world.createCollider(colliderDesc, body);

  if (options?.position) {
    body.setTranslation(options.position, true);
  }

  return {
    visual: mesh,
    body,
    move: (x, y, z) => body.setTranslation({ x, y, z }, true),
  };
}
