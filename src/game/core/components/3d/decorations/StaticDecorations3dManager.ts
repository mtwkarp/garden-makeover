import { inject, injectable } from 'inversify';
import { StaticDecorations3dManagerI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { StaticDecorations3dCollection } from './types/types';
import { MainScene3dI } from '../../../scenes/3d/mainScene3d/types/interfaces';

@injectable()
export default class StaticDecorations3dManager implements StaticDecorations3dManagerI {
  private readonly decorations: StaticDecorations3dCollection;

  private readonly scene: MainScene3dI;

  constructor(
  @inject(TYPES.StaticDecorations3dCollection) decorations: StaticDecorations3dCollection,
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
