import RAPIER from "@dimforge/rapier3d";
import { GameObject, InternalGameObject, GameObjectOptions } from "../GameObject.js";

export interface PhysicalGameObjectOptions extends GameObjectOptions {
  color?: string | number;
  fixed?: boolean;
}

export interface PhysicalGameObject extends GameObject {
}

export interface InternalPhysicalGameObject extends InternalGameObject, PhysicalGameObject {
  body: RAPIER.RigidBody;
}

export function createBody(world: RAPIER.World, options?: PhysicalGameObjectOptions): RAPIER.RigidBody {
  const bodyDesc = options?.fixed ? RAPIER.RigidBodyDesc.fixed() : RAPIER.RigidBodyDesc.dynamic();
  const body = world.createRigidBody(bodyDesc);
  if (options?.position) {
    body.setTranslation(options.position, true);
  }
  return body;
}
