import { inject, injectable } from 'inversify';
import * as THREE from 'three';
import { GraphicsEngine3dI } from '../types/interfaces';
import { TYPES } from '../../IoC/Types';
import { ObservableI } from '../../lib/observable/types/interfaces';
import { ResizeData } from '../../core/observables/types/types';

@injectable()
export default class Three3dEngine implements GraphicsEngine3dI {
  private readonly scene3d: THREE.Scene;

  private camera: THREE.PerspectiveCamera;

  private renderer: THREE.WebGLRenderer;

  private readonly resizeObservable: ObservableI<ResizeData>;

  constructor(@inject(TYPES.ResizeObservable) resizeObservable: ObservableI<ResizeData>) {
    this.resizeObservable = resizeObservable;
    this.scene3d = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  private appendViewIntoContainer(): void {
    const container = document.getElementById('3d-view-container');

    if (!container) {
      throw new Error('No container for 3d engine canvas found.');
    }

    container.appendChild(this.renderer.domElement);
  }

  private setupRenderer(): void {
    const { screenWidth, screenHeight } = this.resizeObservable.getData();

    this.renderer.setSize(screenWidth, screenHeight);
  }

  private setupCamera(): void {
    this.camera.position.z = 3;
    this.camera.position.y = 1.2;
    this.camera.position.x = -3;
    this.camera.lookAt(new THREE.Vector3(-1.2, 0.7, 0));
  }

  private subscribe(): void {
    this.resizeObservable.subscribe(this.resize, this);
  }

  public async initialize(): Promise<void> {
    this.setupRenderer();
    this.setupCamera();
    this.appendViewIntoContainer();
    this.subscribe();
    this.resize();
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

  private resize(): void {
    const { screenWidth, screenHeight } = this.resizeObservable.getData();

    this.camera.aspect = screenWidth / screenHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(screenWidth, screenHeight);
  }
}
