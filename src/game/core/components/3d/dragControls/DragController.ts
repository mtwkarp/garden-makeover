import * as THREE from 'three';
import { inject, injectable } from 'inversify';
import { Group, Object3D, Object3DEventMap } from 'three';
import { EventEmitter } from 'pixi.js';
import { DecorationTargetAreaI } from '../targetArea/types/interfaces';
import { DraggableDecoration3dI } from '../decorations/types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import Three3dEngine from '../../../../engines/3dEngine/Three3dEngine';
import { DragControllerI } from './types/interfaces';
import { GameGlobalEvents } from '../../../events/types/enums';

@injectable()
export default class DragController implements DragControllerI {
  private draggableModel: Group<Object3DEventMap> | Object3D<Object3DEventMap> | null = null;

  private hitAreas: THREE.Object3D[] = [];

  private readonly camera: THREE.Camera;

  private domElement: HTMLElement;

  private targetAreas: DecorationTargetAreaI[] = [];

  private enabled: boolean = true;

  private selected: THREE.Object3D | null = null;

  private readonly plane: THREE.Plane;

  private readonly offset: THREE.Vector3;

  private readonly intersection: THREE.Vector3;

  private readonly raycaster: THREE.Raycaster;

  private readonly mouse: THREE.Vector2;

  private readonly eventManager: EventEmitter;

  constructor(
  @inject(TYPES.Engine3d) engine3d: Three3dEngine,
    @inject(TYPES.GlobalEventsManager) eventsManager: EventEmitter,
  ) {
    this.camera = engine3d.getCamera();
    this.domElement = document.getElementById('2d-view-container') as HTMLElement;
    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.offset = new THREE.Vector3();
    this.intersection = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.eventManager = eventsManager;

    this.subscribeForDomEvents();
  }

  private subscribeForDomEvents(): void {
    this.domElement.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
    this.domElement.addEventListener('pointermove', this.onPointerMove.bind(this), false);
    this.domElement.addEventListener('pointerup', this.onPointerUp.bind(this), false);
  }

  public setDraggable(draggable: DraggableDecoration3dI): void {
    this.draggableModel = draggable.getDecoration();
    this.hitAreas = [draggable.getDecorationHitArea()];
  }

  public unsetHitAreas(): void {
    this.hitAreas = [];
  }

  public unsetTargetAreas(): void {
    this.targetAreas = [];
  }

  public unsetDraggable(): void {
    this.draggableModel = null;
  }

  public setTargetAreas(targetAreas: DecorationTargetAreaI[]): void {
    this.targetAreas = [...targetAreas];
  }

  private onPointerDown(event: MouseEvent): void {
    event.preventDefault();

    this.updateMouse(event);

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.hitAreas, true);

    if (intersects.length > 0) {
      this.selected = intersects[0].object;

      this.plane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), this.selected.position);

      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        this.offset.copy(this.intersection).sub(this.selected.position);
      }
    }
  }

  private onPointerMove(event: MouseEvent): void {
    event.preventDefault();

    if (this.selected && this.enabled) {
      this.updateMouse(event);

      this.raycaster.setFromCamera(this.mouse, this.camera);

      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        const point = this.intersection.clone().sub(this.offset);

        const minX = -2.4;
        const maxX = 2;
        const minZ = -0.4;
        const maxZ = 0.5;

        if (point.x < minX) point.x = minX;
        if (point.x > maxX) point.x = maxX;
        if (point.z < minZ) point.z = minZ;
        if (point.z > maxZ) point.z = maxZ;

        this.selected.position.set(point.x, this.selected.position.y, point.z);

        if (this.draggableModel) {
          this.draggableModel.position.set(point.x, this.draggableModel.position.y, point.z);
        }
      }
    }
  }

  private onPointerUp(event: MouseEvent): void {
    event.preventDefault();

    for (let i = 0; i < this.targetAreas.length; i++) {
      const targetArea = this.targetAreas[i];

      const targetArea3dObject = targetArea.getDecorationTargetArea();

      if (this.selected && !targetArea.disabled) {
        const dx = this.selected.position.x - targetArea3dObject.position.x;
        const dz = this.selected.position.z - targetArea3dObject.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        const { outerRadius } = (targetArea3dObject.geometry as THREE.RingGeometry).parameters;

        if (distance <= outerRadius) {
          this.selected.position.set(targetArea3dObject.position.x, this.selected.position.y, targetArea3dObject.position.z);

          if (this.draggableModel) {
            this.draggableModel.position.set(
              targetArea3dObject.position.x,
              this.draggableModel.position.y,
              targetArea3dObject.position.z,
            );
          }

          this.onSuccessfulDecorationPlace(targetArea);
        }
      }
    }

    this.selected = null;
  }

  private onSuccessfulDecorationPlace(targetArea: DecorationTargetAreaI): void {
    this.unsetDraggable();
    this.unsetHitAreas();
    this.unsetTargetAreas();
    this.eventManager.emit(GameGlobalEvents.decorationSuccessfullyPlaced, targetArea);
  }

  private updateMouse(event: MouseEvent): void {
    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }
}
