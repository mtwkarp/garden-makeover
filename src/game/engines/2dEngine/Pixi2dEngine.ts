import * as PIXI from 'pixi.js';
import { inject, injectable } from 'inversify';
import { GraphicsEngineI } from '../types/interfaces';
import { TYPES } from '../../IoC/Types';
import { MainScene2dI } from '../../core/scenes/2d/mainScene2d/types/interfaces';

@injectable()
export default class Pixi2dEngine implements GraphicsEngineI {
  private readonly app: PIXI.Application;

  private readonly mainScene2d: MainScene2dI;

  constructor(@inject(TYPES.MainScene2d) mainScene: MainScene2dI) {
    this.app = new PIXI.Application();
    this.mainScene2d = mainScene;
  }

  private appendViewIntoContainer(): void {
    const container = document.getElementById('2d-view-container');

    if (!container) {
      throw new Error('No container for 2d engine canvas found.');
    }

    container.appendChild(this.app.renderer.canvas);
  }

  private stopDefaultTicker(): void {
    PIXI.Ticker.shared.stop();
  }

  private addMainSceneToStage(): void {
    this.app.stage.addChild(this.mainScene2d.view);
  }

  private async createApp(): Promise<void> {
    await this.app.init({
      width: 10,
      height: 10,
      backgroundAlpha: 0,
    });
    this.appendViewIntoContainer();

    this.app.stage.position.set(window.innerWidth / 2, window.innerHeight / 2);
  }

  public async initialize(): Promise<void> {
    this.stopDefaultTicker();

    await this.createApp();

    this.addMainSceneToStage();
  }

  public update(time: number, deltaTime: number): void {
    this.app.ticker.update(deltaTime);
  }
}
