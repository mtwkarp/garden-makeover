import { ContainerI } from '../../../../../lib/2d/types/interfaces';
import { DecorationButtonNames } from './enums';

export interface DecorationPickButtonI extends ContainerI {
  view: ContainerI;
  decorationName: DecorationButtonNames;
  enable(): void;
  disable(): void;
}
