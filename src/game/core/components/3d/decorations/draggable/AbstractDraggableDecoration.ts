import { injectable } from 'inversify';
import { Group, Object3D, Object3DEventMap } from 'three';
import { DraggableDecoration3dI } from '../types/interfaces';
import { DraggableDecorationNames } from '../types/enums';

@injectable()
export default abstract class AbstractDraggableDecoration implements DraggableDecoration3dI {
  public abstract name: DraggableDecorationNames;

  protected decorationModel: Group<Object3DEventMap> | Object3D<Object3DEventMap>;

  protected decorationHitArea: Object3D<Object3DEventMap>;

  protected isDraggable: boolean = false;

  public animatePlacing(): void {}

  public getDecoration(): any {
    if (!this.decorationModel) {
      this.createDecoration();
    }

    return this.decorationModel;
  }

  public abstract createDecoration(): void;

  public get draggable(): boolean {
    return this.isDraggable;
  }

  public makeUndraggable(): void {
    this.isDraggable = false;
  }

  public makeDraggable(): void {
    this.isDraggable = true;
  }

  protected abstract createDecorationHitArea(): void;

  public getDecorationHitArea(): Object3D<Object3DEventMap> {
    if (!this.decorationHitArea) {
      this.createDecorationHitArea();
    }

    return this.decorationHitArea;
  }
}
