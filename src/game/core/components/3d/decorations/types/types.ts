import { DraggableDecoration3dI, StaticDecoration3dI } from './interfaces';
import { DraggableDecorationNames } from './enums';

export type StaticDecorations3dCollection = StaticDecoration3dI[];
export type DraggableDecorations3dCollection = Record<DraggableDecorationNames, DraggableDecoration3dI>;
