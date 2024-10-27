import { inject, injectable } from 'inversify';
import { DragControllerI, DragStateI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { MultipleValuesObservableI } from '../../../../lib/observable/types/interfaces';
import { GraphicsEngine3dI } from '../../../../engines/types/interfaces';
import { GameProcessEvents } from '../../../observables/types/enums';
import IdleState from './states/IdleState';
import { DraggableDecoration3dI } from '../decorations/types/interfaces';
import { DecorationTargetAreaI } from '../targetArea/types/interfaces';

@injectable()
export class DragController implements DragControllerI {
  private state: DragStateI;

  constructor(
  @inject(TYPES.Engine3d) engine3d: GraphicsEngine3dI,
    @inject(TYPES.GameProcessObservable) gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>,
  ) {
    this.state = new IdleState(engine3d, gameProcessObservable, this);
  }

  public setDraggable(draggable: DraggableDecoration3dI): void {
    this.state.setDraggable(draggable);
  }

  public unsetDraggable(): void {
    this.state.unsetDraggable();
  }

  public setTargetAreas(targetAreas: DecorationTargetAreaI[]): void {
    this.state.setTargetAreas(targetAreas);
  }

  public changeState(newState: DragStateI): void {
    this.state = newState;
  }
}
