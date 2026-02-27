import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";

export interface GameObject {
  move: (x: number, y: number, z: number) => void;
}

export interface InternalGameObject extends GameObject {
  visual: THREE.Object3D;
}

export interface PhysicalGameObject extends GameObject {
}

export interface InternalPhysicalGameObject extends InternalGameObject, PhysicalGameObject {
  body: RAPIER.RigidBody;
}
