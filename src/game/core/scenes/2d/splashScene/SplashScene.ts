import PixiContainer from '../../../../lib/2d/container/PixiContainer';
import { Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';

export default class SplashScene extends PixiContainer implements Scene2dI {
  constructor() {
    super();

    this.initialize();
  }

  public get sceneName(): string {
    return SceneNames2d.splash;
  }

  private initialize(): void {
    this.hide();
    this.createChildren();
  }

  private createChildren(): void {}
}
