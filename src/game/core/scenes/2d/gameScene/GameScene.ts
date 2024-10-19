import { Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';

export default class GameScene extends PixiScene implements Scene2dI {
  constructor() {
    super();

    this.initialize();
  }

  private initialize(): void {
    this.createChildren();
  }

  private createChildren(): void {}

  private subscribeButtons(): void {}

  private createButtons(): void {}

  public get sceneName(): string {
    return SceneNames2d.game;
  }
}
