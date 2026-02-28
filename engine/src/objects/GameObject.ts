import * as THREE from "three";

export interface Clock {
  dt: number;
}

export interface GameObjectToken<TOptions, TResult> {
  readonly kind: string;
}

export interface GameObjectOptions {
  position?: { x: number; y: number; z: number };
}

export interface GameObject {
  move: (x: number, y: number, z: number) => void;
}

export interface InternalGameObject extends GameObject {
  visual: THREE.Object3D;
}
