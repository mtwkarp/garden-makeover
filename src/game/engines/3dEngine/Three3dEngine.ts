import { injectable } from 'inversify';
import * as THREE from 'three';
import { GraphicsEngineI } from '../types/interfaces';
import AssetsLoader3d from '../../lib/assetsLoaders/AssetsLoader3d';
import ModelsCache from '../../lib/ModelsCache';

@injectable()
export default class Three3dEngine implements GraphicsEngineI {
  private readonly scene: THREE.Scene;

  private readonly camera: THREE.PerspectiveCamera;

  private readonly renderer: THREE.WebGLRenderer;

  private width: number;

  private height: number;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private appendViewIntoContainer(): void {
    const container = document.getElementById('3d-view-container');

    if (!container) {
      throw new Error('No container for 3d engine canvas found.');
    }

    container.appendChild(this.renderer.domElement);
  }

  public initialize(): void {
    this.appendViewIntoContainer();
    this.camera.position.z = 5;
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 20);
    this.scene.add(directionalLight);

    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(0, 0, 20);
    this.scene.add(light);
    new AssetsLoader3d().loadAllAssets().then(() => {
      const model = ModelsCache.getModel('tree1.obj');
      console.log(model);
      model.scale.set(0.3, 0.3, 0.3);
      model.translateY(-2);
      this.scene.add(model);
    });

    this.scene.background = new THREE.Color(0x0000ff);
  }

  public update(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
