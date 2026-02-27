import { Engine as createEngine } from "./Engine.js";
import type { GameObject as GameObjectType, PhysicalGameObject as PhysicalGameObjectType } from "./GameObject.js";
import type { Light as LightType } from "./Light.js";
import type { Box as BoxType } from "./Box.js";

export namespace Novelty {
  export const Engine = createEngine;
  export type GameObject = GameObjectType;
  export type PhysicalGameObject = PhysicalGameObjectType;
  export type Light = LightType;
  export type Box = BoxType;
}
