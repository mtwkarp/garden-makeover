import { DraggableDecorationNames } from './enums';

export interface Decoration3dI {
  getDecoration(): any;
}

export interface DraggableDecoration3dI extends Decoration3dI {
  animatePlacing(): void;
  name: DraggableDecorationNames;
  draggable: boolean;
  makeUndraggable(): void;
  makeDraggable(): void;
}

export interface StaticDecorations3dManagerI {
  setupDecorations(): void;
}

export interface DraggableDecorations3dManagerI {
  getDraggableDecorationByName(name: DraggableDecorationNames): DraggableDecoration3dI;
}
