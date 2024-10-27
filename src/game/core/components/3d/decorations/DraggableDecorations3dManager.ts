import { inject, injectable } from 'inversify';
import { DraggableDecorationNames } from './types/enums';
import { DraggableDecoration3dI, DraggableDecorations3dManagerI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { DraggableDecorations3dCollection } from './types/types';

@injectable()
export default class DraggableDecorations3dManager implements DraggableDecorations3dManagerI {
  private readonly draggableDecorations: Map<DraggableDecorationNames, DraggableDecoration3dI>;

  constructor(@inject(TYPES.DraggableDecorations3dCollection) draggableDecorations: DraggableDecorations3dCollection) {
    this.draggableDecorations = new Map(
      Object.entries(draggableDecorations) as [DraggableDecorationNames, DraggableDecoration3dI][],
    );
  }

  public getDraggableDecorationByName(name: DraggableDecorationNames): DraggableDecoration3dI {
    const decoration = this.draggableDecorations.get(name);

    if (!decoration) {
      throw new Error(`Decoration with name "${name}" not found.`);
    }

    return decoration;
  }
}
