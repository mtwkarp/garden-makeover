import { injectable } from 'inversify';
import { DraggableDecoration3dI } from '../types/interfaces';
import { DraggableDecorationNames } from '../types/enums';

@injectable()
export default abstract class AbstractDraggableDecoration implements DraggableDecoration3dI {
  public abstract name: DraggableDecorationNames;

  protected isDraggable: boolean = false;

  public animatePlacing(): void {}

  public abstract getDecoration(): any;

  public get draggable(): boolean {
    return this.isDraggable;
  }

  public makeUndraggable(): void {
    this.isDraggable = false;
  }

  public makeDraggable(): void {
    this.isDraggable = true;
  }
}
