import { DraggableDecoration3dI } from '../../decorations/types/interfaces';
import { DragControllerI, DragStateI } from '../types/interfaces';
import { GraphicsEngine3dI } from '../../../../../engines/types/interfaces';
import { MultipleValuesObservableI } from '../../../../../lib/observable/types/interfaces';
import { GameProcessEvents } from '../../../../observables/types/enums';
import DragState from './DragState';

export default class IdleState implements DragStateI {
  protected engine3d: GraphicsEngine3dI;

  protected gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>;

  protected context: DragControllerI;

  constructor(
    engine3d: GraphicsEngine3dI,
    gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>,
    context: DragControllerI,
  ) {
    this.engine3d = engine3d;
    this.gameProcessObservable = gameProcessObservable;
    this.context = context;
  }

  public setDraggable(draggable: DraggableDecoration3dI): void {
    this.context.changeState(new DragState(this.engine3d, this.gameProcessObservable, this.context, draggable));
  }

  public unsetDraggable(): void {
    // Nothing to do in Idle state
  }

  public setTargetAreas(): void {
    // Nothing to do in Idle state
  }
}
