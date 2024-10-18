import { Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';
import PixiSprite from '../../../../lib/2d/sprite/PixiSprite';

export default class SplashScene extends PixiScene implements Scene2dI {
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

  private createBackground(): void {
    const background = new PixiSprite('splashScreen/background.jpg');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scale = Math.max(screenWidth / background.width, screenHeight / background.height);

    background.setScale(scale, scale);

    background.setPosition((screenWidth - background.width) / 2, (screenHeight - background.height) / 2);

    this.addChild(background.view);
  }

  private createLoader(): void {}

  private createChildren(): void {
    this.createBackground();
  }
}
