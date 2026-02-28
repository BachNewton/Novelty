import RAPIER from "@dimforge/rapier3d";
import { GameObject, InternalGameObject, GameObjectOptions, Clock } from "../GameObject.js";

export interface PhysicalGameObjectOptions extends GameObjectOptions {
  color?: string | number;
  fixed?: boolean;
  lockRotation?: boolean;
}

export interface PhysicalGameObject extends GameObject {
}

export interface InternalPhysicalGameObject extends InternalGameObject, PhysicalGameObject {
  body: RAPIER.RigidBody;
}

export function createMove(body: RAPIER.RigidBody, clock: Clock) {
  return (dx: number, dy: number, dz: number) => {
    const cur = body.translation();
    body.setTranslation({
      x: cur.x + dx * clock.dt,
      y: cur.y + dy * clock.dt,
      z: cur.z + dz * clock.dt,
    }, true);
  };
}

export function createBody(world: RAPIER.World, options?: PhysicalGameObjectOptions): RAPIER.RigidBody {
  const bodyDesc = options?.fixed ? RAPIER.RigidBodyDesc.fixed() : RAPIER.RigidBodyDesc.dynamic();
  const body = world.createRigidBody(bodyDesc);
  if (options?.position) {
    body.setTranslation(options.position, true);
  }
  if (options?.lockRotation) {
    body.setEnabledRotations(false, false, false, true);
  }
  return body;
}
