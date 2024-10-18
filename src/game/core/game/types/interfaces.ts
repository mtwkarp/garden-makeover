export interface GameI {
  preloadSplashScreen(): Promise<void>;
  preloadAllAssets(): Promise<void>;
  showSplashScreen(): void;
  removeSplashScreen(): void;
  prepare3dScene(): void;
  startGameSetup(): Promise<void>;
  startGame(): void;
}
