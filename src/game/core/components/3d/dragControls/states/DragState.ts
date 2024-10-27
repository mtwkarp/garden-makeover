import * as THREE from 'three';
import { DragControllerI, DragStateI } from '../types/interfaces';
import { DecorationTargetAreaI } from '../../targetArea/types/interfaces';
import { MultipleValuesObservableI } from '../../../../../lib/observable/types/interfaces';
import { GameProcessEvents } from '../../../../observables/types/enums';
import { DraggableDecoration3dI } from '../../decorations/types/interfaces';
import { GraphicsEngine3dI } from '../../../../../engines/types/interfaces';
import IdleState from './IdleState';

export default class DragState implements DragStateI {
  private draggableModel: THREE.Object3D | null;

  private hitAreas: THREE.Object3D[];

  private targetAreas: DecorationTargetAreaI[];

  private selected: THREE.Object3D | null = null;

  protected engine3d: GraphicsEngine3dI;

  private readonly camera: THREE.Camera;

  private readonly domElement: HTMLElement;

  private readonly plane: THREE.Plane;

  private readonly offset: THREE.Vector3;

  private readonly intersection: THREE.Vector3;

  private readonly raycaster: THREE.Raycaster;

  private readonly mouse: THREE.Vector2;

  private readonly gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>;

  private readonly context: DragControllerI;

  private onPointerDownCb = this.onPointerDown.bind(this);

  private onPointerMoveCb = this.onPointerMove.bind(this);

  private onPointerUpCb = this.onPointerUp.bind(this);

  constructor(
    engine3d: GraphicsEngine3dI,
    gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>,
    context: DragControllerI,
    draggable: DraggableDecoration3dI,
  ) {
    this.engine3d = engine3d;
    this.camera = engine3d.getCamera();
    this.domElement = document.getElementById('2d-view-container') as HTMLElement;
    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.offset = new THREE.Vector3();
    this.intersection = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.gameProcessObservable = gameProcessObservable;
    this.context = context;
    this.draggableModel = draggable.getDecoration();
    this.hitAreas = [draggable.getDecorationHitArea()];

    this.subscribeForDomEvents();
  }

  public setDraggable(): void {
    // Already dragging
  }

  public unsetDraggable(): void {
    this.draggableModel = null;
    this.hitAreas = [];
    this.targetAreas = [];
    this.unsubscribeForDomEvents();
    this.context.changeState(new IdleState(this.engine3d, this.gameProcessObservable, this.context));
  }

  public setTargetAreas(targetAreas: DecorationTargetAreaI[]): void {
    this.targetAreas = [...targetAreas];
  }

  private subscribeForDomEvents(): void {
    this.domElement.addEventListener('pointerdown', this.onPointerDownCb, false);
    this.domElement.addEventListener('pointermove', this.onPointerMoveCb, false);
    this.domElement.addEventListener('pointerup', this.onPointerUpCb, false);
  }

  private unsubscribeForDomEvents(): void {
    this.domElement.removeEventListener('pointerdown', this.onPointerDownCb, false);
    this.domElement.removeEventListener('pointermove', this.onPointerMoveCb, false);
    this.domElement.removeEventListener('pointerup', this.onPointerUpCb, false);
  }

  private onPointerDown(event: MouseEvent): void {
    event.preventDefault();
    this.updateMouse(event);

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.hitAreas, true);

    if (intersects.length > 0) {
      this.selected = intersects[0].object;
      this.plane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), this.selected.position);
      this.raycaster.ray.intersectPlane(this.plane, this.intersection);
      this.offset.copy(this.intersection).sub(this.selected.position);
    }
  }

  private onPointerMove(event: MouseEvent): void {
    if (!this.selected) return;

    event.preventDefault();
    this.updateMouse(event);

    this.raycaster.setFromCamera(this.mouse, this.camera);
    if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
      const newPosition = this.intersection.clone().sub(this.offset);
      this.clampPosition(newPosition);
      this.updateSelectedPosition(newPosition);
    }
  }

  private onPointerUp(event: MouseEvent): void {
    if (!this.selected) return;

    event.preventDefault();
    this.checkIfDecorationPlaced();
    this.selected = null;
  }

  private checkIfDecorationPlaced(): void {
    this.targetAreas.forEach((targetArea) => {
      if (!targetArea.disabled && this.isWithinTargetArea(targetArea)) {
        targetArea.disableForever();
        this.onSuccessfulDecorationPlace(targetArea);
      }
    });
  }

  private isWithinTargetArea(targetArea: DecorationTargetAreaI): boolean {
    if (!this.selected) {
      return false;
    }

    const { position: targetAreaPosition, geometry } = targetArea.getDecorationTargetArea();

    const dx = this.selected.position.x - targetAreaPosition.x;
    const dz = this.selected.position.z - targetAreaPosition.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    const { outerRadius } = (geometry as THREE.RingGeometry).parameters;

    return distance <= outerRadius;
  }

  private onSuccessfulDecorationPlace(targetArea: DecorationTargetAreaI): void {
    this.updateSelectedPosition(targetArea.getDecorationTargetArea().position);
    this.unsetDraggable();
    this.gameProcessObservable.notify(GameProcessEvents.decorationSuccessfullyPlaced, null);
  }

  private updateSelectedPosition(position: THREE.Vector3): void {
    if (this.selected) {
      this.selected.position.copy(position);
    }

    if (this.draggableModel) {
      const modelPosition = new THREE.Vector3().copy(position);
      modelPosition.y = this.draggableModel.position.y;

      this.draggableModel.position.copy(modelPosition);
    }
  }

  private clampPosition(position: THREE.Vector3): void {
    const minX = -2.4;
    const maxX = 2;
    const minZ = -0.7;
    const maxZ = 0.5;
    const modifiedPosition = new THREE.Vector3().copy(position);

    if (position.x < minX) modifiedPosition.x = minX;
    if (position.x > maxX) modifiedPosition.x = maxX;
    if (position.z < minZ) modifiedPosition.z = minZ;
    if (position.z > maxZ) modifiedPosition.z = maxZ;

    position.copy(modifiedPosition);
  }

  private updateMouse(event: MouseEvent): void {
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }
}
