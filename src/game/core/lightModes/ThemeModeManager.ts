import { inject, injectable } from 'inversify';
import { ThemeModeManagerI, ThemeModeServiceI } from './types/interfaces';
import { LightModes } from './types/enums';
import { TYPES } from '../../IoC/Types';
import { ThemeModeServicesCollection } from './types/types';

@injectable()
export class ThemeModeManager implements ThemeModeManagerI {
  private mode: LightModes = LightModes.day;

  private readonly listeners: ThemeModeServiceI[] = [];

  constructor(@inject(TYPES.ThemeModeServices) themeModeServices: ThemeModeServicesCollection) {
    this.listeners.push(...themeModeServices);
  }

  public toggleMode(): void {
    this.mode = this.mode === LightModes.day ? LightModes.night : LightModes.day;
    this.notifyListeners();
  }

  public setMode(lightMode: LightModes): void {
    this.mode = lightMode;
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener.toggleMode(this.mode));
  }

  public get currentMode(): LightModes {
    return this.mode;
  }
}
