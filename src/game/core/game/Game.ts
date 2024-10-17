import { injectable } from 'inversify';
import { GameI } from './types/interfaces';

@injectable()
export default class Game implements GameI {
  constructor() {}

  public preloadSplashScreen(): void {}

  public preloadAllAssets(): void {}

  public showSplashScreen(): void {}

  public removeSplashScreen(): void {}

  public startGame(): void {}

  public prepare3dScene(): void {}
}
