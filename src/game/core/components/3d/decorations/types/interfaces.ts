import { Group, Object3D, Object3DEventMap } from 'three';
import { DraggableDecorationNames } from './enums';
import { Themed3dElementI } from '../../../../lightModes/types/interfaces';

export interface Decoration3dI {
  getDecoration(): Group<Object3DEventMap> | Object3D<Object3DEventMap>;
}

export interface StaticDecoration3dI extends Themed3dElementI {
  getDecoration(): Group<Object3DEventMap> | Object3D<Object3DEventMap>;
}

export interface DraggableDecoration3dI extends Decoration3dI {
  animatePlacing(): void;
  name: DraggableDecorationNames;
  getDecorationHitArea(): Object3D<Object3DEventMap>;
  animatePlacingDecorationOnScene(): void;
}

export interface StaticDecorations3dManagerI {
  setupDecorations(): void;
}

export interface DraggableDecorations3dManagerI {
  getDraggableDecorationByName(name: DraggableDecorationNames): DraggableDecoration3dI;
}
