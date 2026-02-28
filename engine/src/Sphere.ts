import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";
import { PhysicalGameObject, InternalPhysicalGameObject, GameObjectToken, PhysicalGameObjectOptions } from "./GameObject.js";

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

  const bodyDesc = RAPIER.RigidBodyDesc.fixed();
  const body = world.createRigidBody(bodyDesc);

  const colliderDesc = RAPIER.ColliderDesc.ball(radius);
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
