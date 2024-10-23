import { inject, injectable } from 'inversify';
import { DraggableDecorationNames } from './types/enums';
import { DraggableDecoration3dI, DraggableDecorations3dManagerI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { DraggableDecorations3dCollection } from './types/types';

@injectable()
export default class DraggableDecorations3dManager implements DraggableDecorations3dManagerI {
  private readonly draggableDecorations: DraggableDecorations3dCollection;

  constructor(@inject(TYPES.DraggableDecorations3dCollection) draggableDecorations: DraggableDecorations3dCollection) {
    this.draggableDecorations = draggableDecorations;
  }

  public getDraggableDecorationByName(name: DraggableDecorationNames): DraggableDecoration3dI {
    const decoration = this.draggableDecorations[name];

    if (!decoration) {
      throw new Error(`Decoration with "${name}" not found.`);
    }

    return decoration;
  }
}
