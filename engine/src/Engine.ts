import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import RAPIER from "@dimforge/rapier3d";
import { GameObject, GameObjectToken, Clock } from "./objects/GameObject.js";
import { InternalPhysicalGameObject } from "./objects/physical/PhysicalGameObject.js";
import { BoxToken, createBox } from "./objects/physical/Box.js";
import { LightToken, createLight } from "./objects/Light.js";
import { SphereToken, createSphere } from "./objects/physical/Sphere.js";
import { CapsuleToken, createCapsule } from "./objects/physical/Capsule.js";
import { Input, createInput } from "./Input.js";
import {
  CameraToken,
  OrbitCameraToken,
  FPSCameraToken,
  FPSCameraOptions,
  Camera,
  createCamera,
} from "./Camera.js";

class EngineInstance {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private world: RAPIER.World;
  private physicsObjects: InternalPhysicalGameObject[] = [];
  private stats: Stats;
  private clock: Clock = { dt: 0 };
  private lastTime = 0;
  private updateCallback?: (input: Input, camera: Camera) => void;
  private input: Input & { flush(): void };

  private orbitControls: OrbitControls | null = null;
  private fpsControls: PointerLockControls | null = null;
  private fpsTarget: InternalPhysicalGameObject | null = null;
  private fpsHeight = 0.8;
  private cameraMode: "orbit" | "fps" = "orbit";
  private cameraApi: Camera;
  private clickToLockHandler: (() => void) | null = null;
  private fpsEuler = new THREE.Euler();
  private fpsQuat = new THREE.Quaternion();

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
    this.camera.position.set(5, 4, 10);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement,
    );

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    this.input = createInput();
    this.cameraApi = createCamera(this.camera);

    window.addEventListener("resize", this.onResize);
  }

  onUpdate(callback: (input: Input, camera: Camera) => void): void {
    this.updateCallback = callback;
  }

  add<O, R extends GameObject>(token: GameObjectToken<O, R>, options?: O): R {
    switch (token.kind) {
      case BoxToken.kind: {
        const box = createBox(this.scene, this.world, this.clock, options as any);
        this.physicsObjects.push(box);
        return box as unknown as R;
      }
      case SphereToken.kind: {
        const sphere = createSphere(this.scene, this.world, this.clock, options as any);
        this.physicsObjects.push(sphere);
        return sphere as unknown as R;
      }
      case CapsuleToken.kind: {
        const capsule = createCapsule(this.scene, this.world, this.clock, options as any);
        this.physicsObjects.push(capsule);
        return capsule as unknown as R;
      }
      case LightToken.kind: {
        return createLight(this.scene, options as any) as unknown as R;
      }
      default:
        throw new Error(`Unknown game object kind: ${token.kind}`);
    }
  }

  setCamera<O>(token: CameraToken<O>, options?: O): void {
    switch (token.kind) {
      case FPSCameraToken.kind:
        this.activateFPSCamera(options as unknown as FPSCameraOptions);
        break;
      case OrbitCameraToken.kind:
        this.activateOrbitCamera();
        break;
      default:
        throw new Error(`Unknown camera kind: ${token.kind}`);
    }
  }

  start(): void {
    this.renderer.setAnimationLoop(this.animate);
    console.log("Novelty Engine started");
  }

  private activateFPSCamera(options: FPSCameraOptions): void {
    // Deactivate current controls
    this.deactivateOrbitCamera();
    this.deactivateFPSCamera();

    // Find the internal physics object matching the user-facing target
    const internal = this.physicsObjects.find((obj) => obj === (options.target as unknown));
    if (!internal) {
      throw new Error("FPSCamera target must be a physics object added via engine.add()");
    }

    this.fpsTarget = internal;
    this.fpsHeight = options.height ?? 0.8;
    this.cameraMode = "fps";

    this.fpsControls = new PointerLockControls(this.camera, this.renderer.domElement);
    this.clickToLockHandler = () => this.fpsControls?.lock();
    this.renderer.domElement.addEventListener("click", this.clickToLockHandler);

    // Snap camera to target position
    const pos = this.fpsTarget.body.translation();
    this.camera.position.set(pos.x, pos.y + this.fpsHeight, pos.z);
  }

  private deactivateFPSCamera(): void {
    if (this.fpsControls) {
      this.fpsControls.unlock();
      this.fpsControls.dispose();
      this.fpsControls = null;
    }
    if (this.clickToLockHandler) {
      this.renderer.domElement.removeEventListener("click", this.clickToLockHandler);
      this.clickToLockHandler = null;
    }
    this.fpsTarget = null;
  }

  private activateOrbitCamera(): void {
    this.deactivateFPSCamera();
    this.deactivateOrbitCamera();

    this.cameraMode = "orbit";
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  private deactivateOrbitCamera(): void {
    if (this.orbitControls) {
      this.orbitControls.dispose();
      this.orbitControls = null;
    }
  }

  private animate = (time: number): void => {
    this.stats.begin();
    this.clock.dt = this.lastTime === 0 ? 0 : (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.updateCallback?.(this.input, this.cameraApi);

    this.world.step();

    for (const { visual, body } of this.physicsObjects) {
      const pos = body.translation();
      visual.position.set(pos.x, pos.y, pos.z);
      const rot = body.rotation();
      visual.quaternion.set(rot.x, rot.y, rot.z, rot.w);
    }

    if (this.cameraMode === "fps" && this.fpsTarget) {
      const pos = this.fpsTarget.body.translation();
      this.camera.position.set(pos.x, pos.y + this.fpsHeight, pos.z);
      // Sync body Y rotation to camera yaw
      this.fpsTarget.body.setRotation(
        this.fpsQuat.setFromEuler(this.fpsEuler.set(0, this.camera.rotation.y, 0)),
        true,
      );
    } else if (this.orbitControls) {
      this.orbitControls.update();
    }

    this.renderer.render(this.scene, this.camera);
    this.input.flush();
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
