import * as THREE from "three";
import { PhysicalGameObject } from "./objects/physical/PhysicalGameObject.js";

export interface CameraToken<TOptions> {
  readonly kind: string;
}

export interface OrbitCameraOptions {}

export const OrbitCameraToken: CameraToken<OrbitCameraOptions> = {
  kind: "OrbitCamera",
};

export interface FPSCameraOptions {
  target: PhysicalGameObject;
  height?: number;
}

export const FPSCameraToken: CameraToken<FPSCameraOptions> = {
  kind: "FPSCamera",
};

export interface Camera {
  forward(speed: number): [number, number, number];
  back(speed: number): [number, number, number];
  left(speed: number): [number, number, number];
  right(speed: number): [number, number, number];
}

export function createCamera(threeCamera: THREE.Camera): Camera {
  const fwd = new THREE.Vector3();

  return {
    forward(speed) {
      threeCamera.getWorldDirection(fwd);
      fwd.y = 0;
      fwd.normalize();
      return [fwd.x * speed, 0, fwd.z * speed];
    },
    back(speed) {
      threeCamera.getWorldDirection(fwd);
      fwd.y = 0;
      fwd.normalize();
      return [-fwd.x * speed, 0, -fwd.z * speed];
    },
    left(speed) {
      threeCamera.getWorldDirection(fwd);
      fwd.y = 0;
      fwd.normalize();
      return [fwd.z * speed, 0, -fwd.x * speed];
    },
    right(speed) {
      threeCamera.getWorldDirection(fwd);
      fwd.y = 0;
      fwd.normalize();
      return [-fwd.z * speed, 0, fwd.x * speed];
    },
  };
}
