import { injectable } from 'inversify';
import { ThemedUIElementI, UIThemeModeServiceI } from '../types/interfaces';
import { LightModes } from '../types/enums';

@injectable()
export class UIThemeModeService implements UIThemeModeServiceI {
  private readonly uiElements: ThemedUIElementI[] = [];

  public registerUIElement(element: ThemedUIElementI): void {
    this.uiElements.push(element);
  }

  public toggleMode(lightMode: LightModes): void {
    this.uiElements.forEach((element) => element.applyTheme(lightMode));
  }
}
