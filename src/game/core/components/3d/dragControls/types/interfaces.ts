import { DraggableDecoration3dI } from '../../decorations/types/interfaces';
import { DecorationTargetAreaI } from '../../targetArea/types/interfaces';

export interface DragControllerI {
  setDraggable(draggable: DraggableDecoration3dI): void;
  unsetDraggable(): void;
  setTargetAreas(targetAreas: DecorationTargetAreaI[]): void;
  changeState(newState: DragStateI): void;
}

export interface DragStateI {
  setDraggable(draggable: DraggableDecoration3dI): void;
  unsetDraggable(): void;
  setTargetAreas(targetAreas: DecorationTargetAreaI[]): void;
}
