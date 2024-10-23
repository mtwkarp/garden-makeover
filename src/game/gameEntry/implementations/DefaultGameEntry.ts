import { inject, injectable } from 'inversify';
import AbstractGameEntry from '../AbstractGameEntry';
import { GameEntryI } from '../types/interfaces';
import { TYPES } from '../../IoC/Types';
import { AppI } from '../../app/types/interfaces';

@injectable()
export default class DefaultGameEntry extends AbstractGameEntry implements GameEntryI {
  private readonly gameApp: AppI;

  constructor(@inject(TYPES.App) gameApp: AppI) {
    super();

    this.gameApp = gameApp;
  }

  public run(): void {
    this.gameApp.runGame();
  }
}
