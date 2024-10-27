import { inject, injectable } from 'inversify';
import { GraphicsEngineI, UpdateEngineI } from '../engines/types/interfaces';
import { TYPES } from '../IoC/Types';
import { AppI } from './types/interfaces';
import { GameI } from '../core/game/types/interfaces';

@injectable()
export default class App implements AppI {
  private readonly engine2d: GraphicsEngineI;

  private readonly engine3d: GraphicsEngineI;

  private readonly updateEngine: UpdateEngineI;

  private readonly game: GameI;

  constructor(
  @inject(TYPES.Engine2d) engine2d: GraphicsEngineI,
    @inject(TYPES.Engine3d) engine3d: GraphicsEngineI,
    @inject(TYPES.UpdateEngine) updateEngine: UpdateEngineI,
    @inject(TYPES.Game) game: GameI,
  ) {
    this.engine2d = engine2d;
    this.engine3d = engine3d;
    this.updateEngine = updateEngine;
    this.game = game;
  }

  public async runGame(): Promise<void> {
    await this.setupEngines();
    await this.game.startGameSetup();
    this.game.startGame();
  }

  private async setupEngines(): Promise<void> {
    await this.engine2d.initialize();
    await this.engine3d.initialize();
    this.updateEngine.initialize();

    this.updateEngine.addCallbackToUpdateLoop(this.engine2d.update.bind(this.engine2d));
    this.updateEngine.addCallbackToUpdateLoop(this.engine3d.update.bind(this.engine3d));
  }
}
