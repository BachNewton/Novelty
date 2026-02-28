import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import RAPIER from "@dimforge/rapier3d";
import { GameObject, GameObjectToken, InternalPhysicalGameObject } from "./GameObject.js";
import { BoxToken, createBox } from "./Box.js";
import { LightToken, createLight } from "./Light.js";
import { SphereToken, createSphere } from "./Sphere.js";

class EngineInstance {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private world: RAPIER.World;
  private physicsObjects: InternalPhysicalGameObject[] = [];
  private stats: Stats;
  private controls: OrbitControls;

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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    window.addEventListener("resize", this.onResize);
  }

  add<O, R extends GameObject>(token: GameObjectToken<O, R>, options?: O): R {
    switch (token.kind) {
      case BoxToken.kind: {
        const box = createBox(this.scene, this.world, options as any);
        this.physicsObjects.push(box);
        return box as unknown as R;
      }
      case SphereToken.kind: {
        const sphere = createSphere(this.scene, this.world, options as any);
        this.physicsObjects.push(sphere);
        return sphere as unknown as R;
      }
      case LightToken.kind: {
        return createLight(this.scene, options as any) as unknown as R;
      }
      default:
        throw new Error(`Unknown game object kind: ${token.kind}`);
    }
  }

  start(): void {
    this.renderer.setAnimationLoop(this.animate);
    console.log("Novelty Engine started");
  }

  private animate = (): void => {
    this.stats.begin();
    this.world.step();

    for (const { visual, body } of this.physicsObjects) {
      const pos = body.translation();
      visual.position.set(pos.x, pos.y, pos.z);
      const rot = body.rotation();
      visual.quaternion.set(rot.x, rot.y, rot.z, rot.w);
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
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
