import { DraggableDecorationNames } from './enums';

export interface Decoration3dI {
  getDecoration(): any;
}

export interface DraggableDecoration3dI extends Decoration3dI {
  animatePlacing(): void;
  name: DraggableDecorationNames;
}

export interface Decorations3dManagerI {
  setupDecorations(): void;
}
