import { injectable } from 'inversify';
import * as THREE from 'three';
import { GraphicsEngineI } from '../types/interfaces';

@injectable()
export default class Three3dEngine implements GraphicsEngineI {
  private readonly scene: THREE.Scene;

  private readonly camera: THREE.PerspectiveCamera;

  private readonly renderer: THREE.WebGLRenderer;

  private width: number;

  private height: number;

  private cube: THREE.Mesh;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
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
    // remove
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);
    this.camera.position.z = 5;
    // remove
  }

  public update(): void {
    // remove
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    //
    this.renderer.render(this.scene, this.camera);
  }
}
