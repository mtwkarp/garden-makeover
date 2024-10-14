import * as PIXI from 'pixi.js';
import { injectable } from 'inversify';
import { GraphicsEngineI } from '../types/interfaces';

@injectable()
export default class Pixi2dEngine implements GraphicsEngineI {
  private readonly app: PIXI.Application;

  constructor() {
    this.app = new PIXI.Application();
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

  public initialize(): void {
    this.stopDefaultTicker();
    // TODO
    this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundAlpha: 0,
    });

    this.app.stage.position.set(window.innerWidth / 2, window.innerHeight / 2);
  }

  public update(time: number, deltaTime: number): void {
    this.app.ticker.update(deltaTime);
  }
}
