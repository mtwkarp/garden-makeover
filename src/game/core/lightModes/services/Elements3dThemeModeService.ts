import { injectable } from 'inversify';
import { Elements3dThemeModeServiceI, ThemedElementI } from '../types/interfaces';
import { LightModes } from '../types/enums';

@injectable()
export class Elements3dThemeModeService implements Elements3dThemeModeServiceI {
  private readonly lights: ThemedElementI[] = [];

  public registerElement(element: ThemedElementI): void {
    this.lights.push(element);
  }

  public toggleMode(lightMode: LightModes): void {
    this.lights.forEach((element) => element.applyTheme(lightMode));
  }
}
