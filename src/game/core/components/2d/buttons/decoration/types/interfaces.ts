import { ContainerI } from '../../../../../../lib/2d/types/interfaces';
import { DecorationButtonNames } from './enums';
import { ThemedUIElementI } from '../../../../../lightModes/types/interfaces';

export interface DecorationPickButtonI extends ContainerI, ThemedUIElementI {
  view: ContainerI;
  decorationName: DecorationButtonNames;
  enable(): void;
  disable(): void;
  disableForever(): void;
}

export interface DecorationButtonsManagerI {
  getButtonsView(): ContainerI;
}
