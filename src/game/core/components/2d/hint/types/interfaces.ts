import { HintIds2d, HintIds3d } from './enums';
import { ContainerI } from '../../../../../lib/2d/types/interfaces';
import { MainScene3dI } from '../../../../scenes/3d/mainScene3d/types/interfaces';
import { HintIds } from './types';

export interface HintI {
  display(): void;
  hide(): void;
  markCompleted(): void;
  shouldDisplay(): boolean;
  initialize(): void;
  view: any;
  id: HintIds;
}

export interface Hint3dI extends HintI {
  setPosition(position: { x: number; y: number; z: number }): void;
}
export interface Hint2dI extends HintI {
  setPosition(position: { x: number; y: number }): void;
}

export interface HintsManagerI {
  add2DHint(hintId: HintIds2d, container: ContainerI, position: { x: number; y: number }): void;
  add3DHint(hint: HintIds3d, scene: MainScene3dI, position: { x: number; y: number; z: number }): void;
  displayHint(hintId: HintIds): void;
  hideHintAsCompleted(hintId: HintIds): void;
  hideHintAsNotCompleted(hintId: HintIds): void;
}
