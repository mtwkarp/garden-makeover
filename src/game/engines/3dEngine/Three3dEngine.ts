import { injectable } from 'inversify';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GraphicsEngine3dI } from '../types/interfaces';
import DraggableCube from '../../core/components/3d/draggable/DraggableCube';
import TargetArea from '../../core/components/3d/targetArea/TargetArea';
import MyDragControls from '../../core/components/3d/dragControls/MyDragControls';

@injectable()
export default class Three3dEngine implements GraphicsEngine3dI {
  private readonly scene3d: THREE.Scene;

  private readonly camera: THREE.PerspectiveCamera;

  private readonly renderer: THREE.WebGLRenderer;

  private orbitControls: OrbitControls;

  private width: number;

  private height: number;

  private cube: DraggableCube;

  private targetArea: TargetArea;

  private dragControls: MyDragControls;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene3d = new THREE.Scene();
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

  private setupCamera(): void {
    this.camera.position.z = 2;
    this.camera.position.y = 1;
    this.camera.position.x = -3;
    this.camera.rotation.y = -Math.PI / 5;
  }

  private setupScene(): void {}

  private setupOrbitControls(): void {
    if (process.env.NODE_ENV === 'development' && process.env.ENABLE_ORBIT_CONTROLS) {
      this.orbitControls = new OrbitControls(this.camera, document.getElementById('2d-view-container'));
    }
  }

  public async initialize(): Promise<void> {
    this.setupScene();
    this.setupCamera();
    this.setupOrbitControls();
    this.appendViewIntoContainer();
    this.addObjects();
    this.initDragControls();
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

  private addObjects(): void {
    this.cube = new DraggableCube(1, 0x00ff00);
    this.scene.add(this.cube);

    this.targetArea = new TargetArea(1, 0xffff00);
    this.scene.add(this.targetArea);
  }

  private initDragControls(): void {
    this.dragControls = new MyDragControls(
      [this.cube],
      this.camera,
      document.getElementById('2d-view-container') as HTMLElement,
      this.targetArea,
    );
  }
}
