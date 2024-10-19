import { inject, injectable } from 'inversify';
import { GameI } from './types/interfaces';
import { TYPES } from '../../IoC/Types';
import { AssetLoadersManagerI } from '../../assetsLoaders/types/interfaces';
import { MainScene2dI } from '../scenes/2d/mainScene2d/types/interfaces';
import { SceneNames2d } from '../scenes/2d/types/enums';
import { Decorations3dManagerI } from '../scenes/3d/decorations/types/interfaces';

@injectable()
export default class Game implements GameI {
  private readonly assetsLoader: AssetLoadersManagerI;

  private readonly main2dScene: MainScene2dI;

  private readonly decorations3d: Decorations3dManagerI;

  constructor(
  @inject(TYPES.AssetLoadersManager) assetsLoader: AssetLoadersManagerI,
    @inject(TYPES.MainScene2d) mainScene2d: MainScene2dI,
    @inject(TYPES.Decorations3dManager) decorations3d: Decorations3dManagerI,
  ) {
    this.assetsLoader = assetsLoader;
    this.main2dScene = mainScene2d;
    this.decorations3d = decorations3d;
  }

  public async preloadSplashScreen(): Promise<void> {
    await this.assetsLoader.loadSpecific2dAssets([
      {
        alias: 'splashScreen/background.jpg',
        src: 'assets/2d/splashScreen/background.jpg',
      },
      {
        alias: 'splashScreen/rotate.png',
        src: 'assets/2d/splashScreen/rotate.png',
      },
    ]);
  }

  public async preloadAllAssets(): Promise<void> {
    await this.assetsLoader.loadAllAssets();
  }

  public showSplashScreen(): void {
    this.main2dScene.showScene(SceneNames2d.splash);
  }

  public removeSplashScreen(): void {
    this.main2dScene.destroyScene(SceneNames2d.splash);
  }

  public prepare3dScene(): void {
    this.decorations3d.setupDecorations();
  }

  public async startGameSetup(): Promise<void> {
    await this.preloadSplashScreen();
    this.showSplashScreen();
    await this.preloadAllAssets();
    this.prepare3dScene();
  }

  public startGame(): void {
    this.removeSplashScreen();
    //     const pixiCanvas = document.getElementById('2d-view-container');
    //     const threeCanvas = document.getElementById('3d-view-container');
    // if(!pixiCanvas || !threeCanvas) {
    //   return
    // }
    // // List of pointer events to forward
    //     const pointerEvents = ['pointerdown', 'pointermove', 'pointerup'];
    //
    //     pointerEvents.forEach(eventName => {
    //       pixiCanvas.addEventListener(eventName, (event) => {
    //         // Create a new event with the same type and properties
    //         const newEvent = new Event(event.type, event);
    //         threeCanvas.dispatchEvent(newEvent);
    //       });
    //     });
    //
    // // Handle Three.js events
    //     threeCanvas.addEventListener('pointerdown', (event) => {
    //       console.log('Pointer down in Three.js', event.clientX, event.clientY);
    //     });
    //
    //     threeCanvas.addEventListener('pointermove', (event) => {
    //       console.log('Pointer move in Three.js', event.clientX, event.clientY);
    //     });
    //
    //     threeCanvas.addEventListener('pointerup', (event) => {
    //       console.log('Pointer up in Three.js', event.clientX, event.clientY);
    //     });
  }
}
