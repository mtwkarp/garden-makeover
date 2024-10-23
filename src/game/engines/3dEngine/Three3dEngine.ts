import { injectable } from 'inversify';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GraphicsEngine3dI } from '../types/interfaces';

@injectable()
export default class Three3dEngine implements GraphicsEngine3dI {
  private readonly scene3d: THREE.Scene;

  private readonly camera: THREE.PerspectiveCamera;

  private readonly renderer: THREE.WebGLRenderer;

  private orbitControls: OrbitControls;

  constructor() {
    this.scene3d = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private appendViewIntoContainer(): void {
    const container = document.getElementById('3d-view-container');

    if (!container) {
      throw new Error('No container for 3d engine canvas found.');
    }

    container.appendChild(this.renderer.domElement);
  }

  private setupCamera(): void {
    this.camera.position.z = 3;
    this.camera.position.y = 1.2;
    this.camera.position.x = -3;
    this.camera.lookAt(new THREE.Vector3(-1.2, 0.7, 0));
  }

  private setupOrbitControls(): void {
    if (process.env.NODE_ENV === 'development' && process.env.ENABLE_ORBIT_CONTROLS) {
      // this.orbitControls = new OrbitControls(this.camera, document.getElementById('2d-view-container'));
    }
  }

  public async initialize(): Promise<void> {
    this.setupCamera();
    this.setupOrbitControls();
    this.appendViewIntoContainer();
  }

  public update(): void {
    this.renderer.render(this.scene3d, this.camera);
  }

  public get scene(): THREE.Scene {
    return this.scene3d;
  }

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  public getCamera(): any {
    return this.camera;
  }
}
