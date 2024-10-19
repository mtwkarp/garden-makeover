import { inject, injectable } from 'inversify';
import { Decorations3dManagerI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { Decorations3dCollection } from './types/types';
import { MainScene3dI } from '../mainScene3d/types/interfaces';

@injectable()
export default class Decorations3dManager implements Decorations3dManagerI {
  private readonly decorations: Decorations3dCollection;

  private readonly scene: MainScene3dI;

  constructor(
  @inject(TYPES.Decorations3dCollection) decorations: Decorations3dCollection,
    @inject(TYPES.MainScene3d) scene: MainScene3dI,
  ) {
    this.decorations = decorations;
    this.scene = scene;
  }

  public setupDecorations(): void {
    this.decorations.forEach((decoration) => {
      this.scene.addToScene(decoration.getDecoration());
    });
  }
}
