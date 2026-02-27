import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";
import { Light, createLight } from "./Light.js";
import { InternalPhysicalGameObject } from "./GameObject.js";
import { Box, createBox } from "./Box.js";

class EngineInstance {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private world: RAPIER.World;
  private physicsObjects: InternalPhysicalGameObject[] = [];

  constructor(world: RAPIER.World) {
    this.world = world;
    console.log("Rapier initialized");

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onResize);
  }

  addLight(): Light {
    return createLight(this.scene);
  }

  addBox(): Box {
    const box = createBox(this.scene, this.world);
    this.physicsObjects.push(box);
    return box;
  }

  start(): void {
    this.renderer.setAnimationLoop(this.animate);
    console.log("Novelty Engine started");
  }

  private animate = (): void => {
    this.world.step();

    for (const { visual, body } of this.physicsObjects) {
      const pos = body.translation();
      visual.position.set(pos.x, pos.y, pos.z);
      const rot = body.rotation();
      visual.quaternion.set(rot.x, rot.y, rot.z, rot.w);
    }

    this.renderer.render(this.scene, this.camera);
  };

  private onResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}

export async function Engine(): Promise<EngineInstance> {
  const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
  return new EngineInstance(world);
}
