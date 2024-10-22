import { Decoration3dI, DraggableDecoration3dI } from './interfaces';
import { DraggableDecorationNames } from './enums';

export type StaticDecorations3dCollection = Decoration3dI[];
export type DraggableDecorations3dCollection = Record<DraggableDecorationNames, DraggableDecoration3dI>;
