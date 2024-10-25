import * as PIXI from 'pixi.js';
import { inject, injectable } from 'inversify';
import { GraphicsEngineI } from '../types/interfaces';
import { TYPES } from '../../IoC/Types';
import { MainScene2dI } from '../../core/scenes/2d/mainScene2d/types/interfaces';
import { ObservableI } from '../../lib/observable/types/interfaces';
import { ResizeData } from '../../core/observables/types/types';

@injectable()
export default class Pixi2dEngine implements GraphicsEngineI {
  private readonly app: PIXI.Application;

  private readonly mainScene2d: MainScene2dI;

  private readonly resizeObservable: ObservableI<ResizeData>;

  constructor(
  @inject(TYPES.MainScene2d) mainScene: MainScene2dI,
    @inject(TYPES.ResizeObservable) resizeObservable: ObservableI<ResizeData>,
  ) {
    this.app = new PIXI.Application();
    this.mainScene2d = mainScene;
    this.resizeObservable = resizeObservable;
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
    const { screenWidth, screenHeight } = this.resizeObservable.getData();

    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundAlpha: 0,
    });
    this.appendViewIntoContainer();

    this.app.stage.position.set(screenWidth / 2, screenHeight / 2);
  }

  private subscribe(): void {
    this.resizeObservable.subscribe(this.resize, this);
  }

  public async initialize(): Promise<void> {
    this.stopDefaultTicker();

    await this.createApp();

    this.addMainSceneToStage();

    this.subscribe();
  }

  public update(time: number, deltaTime: number): void {
    this.app.ticker.update(deltaTime);
  }

  private resize(): void {
    const { screenWidth, screenHeight } = this.resizeObservable.getData();
    this.app.renderer.resize(screenWidth, screenHeight);

    this.app.stage.position.set(screenWidth / 2, screenHeight / 2);
  }
}
