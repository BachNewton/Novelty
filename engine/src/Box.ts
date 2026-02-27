import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";
import { PhysicalGameObject, InternalPhysicalGameObject } from "./GameObject.js";

export interface Box extends PhysicalGameObject {
}

export interface InternalBox extends InternalPhysicalGameObject, Box {
}

export function createBox(scene: THREE.Scene, world: RAPIER.World): InternalBox {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xffffff }),
  );
  scene.add(mesh);

  const bodyDesc = RAPIER.RigidBodyDesc.fixed();
  const body = world.createRigidBody(bodyDesc);

  const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
  world.createCollider(colliderDesc, body);

  return {
    visual: mesh,
    body,
    move: (x, y, z) => body.setTranslation({ x, y, z }, true),
  };
}
