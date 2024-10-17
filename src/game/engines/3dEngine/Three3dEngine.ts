import { injectable } from 'inversify';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GraphicsEngineI } from '../types/interfaces';
import AssetsLoader3d from '../../lib/assetsLoaders/AssetsLoader3d';
import ModelsCache from '../../lib/ModelsCache';

@injectable()
export default class Three3dEngine implements GraphicsEngineI {
  private readonly scene: THREE.Scene;

  private readonly camera: THREE.PerspectiveCamera;

  private readonly renderer: THREE.WebGLRenderer;

  private orbitControls: OrbitControls;

  private width: number;

  private height: number;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
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

  private setupLight(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0, 20);
    this.scene.add(directionalLight);
  }

  private setupCamera(): void {
    this.camera.position.z = 5;
  }

  private setupScene(): void {
    this.scene.background = new THREE.Color(0x0000ff);
  }

  private setupOrbitControls(): void {
    if (process.env.NODE_ENV === 'development' && process.env.ENABLE_ORBIT_CONTROLS) {
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    }
  }

  public initialize(): void {
    this.setupLight();
    this.setupScene();
    this.setupCamera();
    this.setupOrbitControls();
    this.appendViewIntoContainer();

    new AssetsLoader3d().loadAllAssets().then(() => {
      const model = ModelsCache.getModel('Tree.obj');
      model.scale.set(0.3, 0.3, 0.3);
      model.translateY(-2);

      this.scene.add(model);
    });
  }

  public update(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
