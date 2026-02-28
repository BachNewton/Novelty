import { Engine as createEngine } from "./Engine.js";
import type { GameObject as GameObjectType, PhysicalGameObject as PhysicalGameObjectType, GameObjectOptions as GameObjectOptionsType, PhysicalGameObjectOptions as PhysicalGameObjectOptionsType } from "./GameObject.js";
import type { Light as LightType, LightOptions as LightOptionsType } from "./Light.js";
import type { Box as BoxType, BoxOptions as BoxOptionsType } from "./Box.js";
import type { Sphere as SphereType, SphereOptions as SphereOptionsType } from "./Sphere.js";
import { LightToken } from "./Light.js";
import { BoxToken } from "./Box.js";
import { SphereToken } from "./Sphere.js";

export namespace Novelty {
  export const Engine = createEngine;
  export type GameObject = GameObjectType;
  export type PhysicalGameObject = PhysicalGameObjectType;
  export type GameObjectOptions = GameObjectOptionsType;
  export type PhysicalGameObjectOptions = PhysicalGameObjectOptionsType;
  export type Light = LightType;
  export const Light = LightToken;
  export type Box = BoxType;
  export const Box = BoxToken;
  export type BoxOptions = BoxOptionsType;
  export type Sphere = SphereType;
  export const Sphere = SphereToken;
  export type SphereOptions = SphereOptionsType;
  export type LightOptions = LightOptionsType;
}
