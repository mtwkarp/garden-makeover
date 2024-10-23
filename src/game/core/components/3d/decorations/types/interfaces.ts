import { Group, Object3D, Object3DEventMap } from 'three';
import { DraggableDecorationNames } from './enums';

export interface Decoration3dI {
  getDecoration(): Group<Object3DEventMap> | Object3D<Object3DEventMap>;
}

export interface DraggableDecoration3dI extends Decoration3dI {
  animatePlacing(): void;
  name: DraggableDecorationNames;
  draggable: boolean;
  makeUndraggable(): void;
  makeDraggable(): void;
  getDecorationHitArea(): Object3D<Object3DEventMap>;
}

export interface StaticDecorations3dManagerI {
  setupDecorations(): void;
}

export interface DraggableDecorations3dManagerI {
  getDraggableDecorationByName(name: DraggableDecorationNames): DraggableDecoration3dI;
}
