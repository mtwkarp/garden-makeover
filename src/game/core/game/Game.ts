import { inject, injectable } from 'inversify';
import { GameI } from './types/interfaces';
import { TYPES } from '../../IoC/Types';
import { AssetLoadersManagerI } from '../../assetsLoaders/types/interfaces';
import { MainScene2dI } from '../scenes/2d/mainScene2d/types/interfaces';
import { SceneNames2d } from '../scenes/2d/types/enums';
import { StaticDecorations3dManagerI } from '../components/3d/decorations/types/interfaces';
import SceneDecorationController from '../components/3d/sceneDecorator/SceneDecorationController';
import { ThemeModeManagerI } from '../lightModes/types/interfaces';
import { LightModes } from '../lightModes/types/enums';

@injectable()
export default class Game implements GameI {
  private readonly assetsLoader: AssetLoadersManagerI;

  private readonly main2dScene: MainScene2dI;

  private readonly decorations3d: StaticDecorations3dManagerI;

  private readonly sceneDecorationController: SceneDecorationController;

  private readonly themeModeManager: ThemeModeManagerI;

  constructor(
  @inject(TYPES.AssetLoadersManager) assetsLoader: AssetLoadersManagerI,
    @inject(TYPES.MainScene2d) mainScene2d: MainScene2dI,
    @inject(TYPES.Decorations3dManager) decorations3d: StaticDecorations3dManagerI,
    @inject(TYPES.SceneDecorationController) sceneDecorationController: SceneDecorationController,
    @inject(TYPES.ThemeModeManager) themeModeManager: ThemeModeManagerI,
  ) {
    this.assetsLoader = assetsLoader;
    this.main2dScene = mainScene2d;
    this.decorations3d = decorations3d;
    this.sceneDecorationController = sceneDecorationController;
    this.themeModeManager = themeModeManager;
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
    this.themeModeManager.setMode(LightModes.day);
  }

  public async startGameSetup(): Promise<void> {
    await this.preloadSplashScreen();
    this.showSplashScreen();
    await this.preloadAllAssets();
    this.prepare3dScene();
  }

  public startGame(): void {
    this.removeSplashScreen();
    this.main2dScene.showScene(SceneNames2d.game);
    this.sceneDecorationController.enableSceneDecoration();
  }
}
