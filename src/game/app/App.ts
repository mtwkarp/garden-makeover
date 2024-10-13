import { inject, injectable } from 'inversify';
import { GraphicsEngineI, UpdateEngineI } from '../engines/types/interfaces';
import { TYPES } from '../IoC/Types';
import { AppI } from './types/interfaces';

@injectable()
export default class App implements AppI {
  private readonly engine2d: GraphicsEngineI;

  private readonly engine3d: GraphicsEngineI;

  private readonly updateEngine: UpdateEngineI;

  constructor(
  @inject(TYPES.Engine2d) engine2d: GraphicsEngineI,
    @inject(TYPES.Engine3d) engine3d: GraphicsEngineI,
    @inject(TYPES.UpdateEngine) updateEngine: UpdateEngineI,
  ) {
    this.engine2d = engine2d;
    this.engine3d = engine3d;
    this.updateEngine = updateEngine;
  }

  public runGame(): void {
    this.setupEngines();
  }

  private setupEngines(): void {
    this.engine2d.initialize();
    this.engine3d.initialize();
    this.updateEngine.initialize();

    this.updateEngine.addCallbackToUpdateLoop(this.engine2d.update.bind(this.engine2d));
    this.updateEngine.addCallbackToUpdateLoop(this.engine3d.update.bind(this.engine3d));
  }
}
