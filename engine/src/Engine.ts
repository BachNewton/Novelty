import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";

class EngineInstance {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private world: RAPIER.World;

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

  start(): void {
    this.renderer.setAnimationLoop(this.animate);
    console.log("Novelty Engine started");
  }

  private animate = (): void => {
    this.world.step();
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
