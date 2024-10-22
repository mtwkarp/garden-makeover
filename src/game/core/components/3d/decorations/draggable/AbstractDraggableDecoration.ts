import { injectable } from 'inversify';
import { DraggableDecoration3dI } from '../types/interfaces';
import { DraggableDecorationNames } from '../types/enums';

@injectable()
export default abstract class AbstractDraggableDecoration implements DraggableDecoration3dI {
  public abstract name: DraggableDecorationNames;

  public animatePlacing(): void {}

  public abstract getDecoration(): any;
}
