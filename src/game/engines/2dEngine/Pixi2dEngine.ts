import * as PIXI from 'pixi.js';
import { injectable } from 'inversify';
import { Assets, Graphics, Sprite } from 'pixi.js';
import { GraphicsEngineI } from '../types/interfaces';
import AssetsPreloader2d from '../../lib/AssetsPreloader2d';

@injectable()
export default class Pixi2dEngine implements GraphicsEngineI {
  private readonly app: PIXI.Application;

  private graphics: PIXI.Graphics;

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
    this.app
      .init({
        width: window.innerWidth,
        height: window.innerHeight,
        // backgroundColor: 'pink',
        backgroundAlpha: 0,
      })
      .then(() => {
        this.appendViewIntoContainer();
        new AssetsPreloader2d().loadAllAssets().then(() => {
          const a = Sprite.from(Assets.get('splashScreen/background.jpg'));
          a.anchor.set(0.5);
          a.scale.set(0.5);
          this.app.stage.addChild(a);
        });
        // remove
        this.graphics = new Graphics().rect(0, 0, 200, 100).fill(0xff0000);
        // this.graphics.position.set(300, 300);
        this.app.stage.addChild(this.graphics);
        //
      });
    this.app.stage.position.set(window.innerWidth / 2, window.innerHeight / 2);
  }

  public update(time: number, deltaTime: number): void {
    if (this.graphics) {
      this.graphics.rotation += 0.005 * deltaTime;
    }
    this.app.ticker.update(deltaTime);
  }
}
