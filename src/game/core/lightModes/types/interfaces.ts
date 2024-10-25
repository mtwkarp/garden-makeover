import { LightModes } from './enums';
import { LightI } from '../../../lib/3d/light/types/interfaces';

export interface ThemedElementI {
  applyTheme(lightMode: LightModes): void;
}

export interface ThemedUIElementI extends ThemedElementI {}

export interface ThemedLightI extends ThemedElementI, LightI {}

export interface Themed3dElementI extends ThemedElementI {}

export interface ThemeModeServiceI {
  toggleMode(lightMode: LightModes): void;
}

export interface UIThemeModeServiceI extends ThemeModeServiceI {
  registerUIElement(uiElement: ThemedUIElementI): void;
}

export interface Elements3dThemeModeServiceI extends ThemeModeServiceI {
  registerElement(element: ThemedElementI): void;
}

export interface ThemeModeManagerI {
  toggleMode(): void;
  setMode(lightMode: LightModes): void;
  currentMode: LightModes;
}
