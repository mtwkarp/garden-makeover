import { injectable } from 'inversify';
import * as THREE from 'three';
import { SceneDecorationControllerI } from './types/interfaces';
import TargetArea from '../targetArea/TargetArea';
import DraggableObject from '../draggable/DraggableObject';

@injectable()
export default class SceneDecorationController implements SceneDecorationControllerI {
  private scene: THREE.Scene;

  private camera: THREE.Camera;

  private domElement: HTMLElement;

  private targetAreas: TargetArea[];

  private currentObject: DraggableObject | null = null;

  private draggableObjects: DraggableObject[] = [];

  constructor(scene: THREE.Scene, camera: THREE.Camera, domElement: HTMLElement, targetAreas: TargetArea[]) {
    this.scene = scene;
    this.camera = camera;
    this.domElement = domElement;
    this.targetAreas = targetAreas;
  }

  public createObject(type: string): void {
    if (this.currentObject) {
      return;
    }

    switch (type) {
      case 'tree':
        break;
      case 'bush':
        break;
      case 'flower':
        break;
      default:
        console.error('Unknown object type:', type);
        return;
    }

    if (this.currentObject) {
      this.scene.add(this.currentObject);
      this.draggableObjects.push(this.currentObject);
    }
  }

  public cancelDragging(): void {
    if (this.currentObject) {
      this.scene.remove(this.currentObject);
      this.draggableObjects = this.draggableObjects.filter((obj) => obj !== this.currentObject);
      this.currentObject = null;
    }
  }

  public objectPlaced(object: DraggableObject): void {
    object.draggable = false;
    this.currentObject = null;
  }

  public getDraggableObjects(): DraggableObject[] {
    return this.draggableObjects;
  }
}
