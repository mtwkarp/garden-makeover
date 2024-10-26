import { HintIds2d, HintIds3d } from './enums';
import { Hint2dI, Hint3dI } from './interfaces';

export type HintIds = HintIds2d | HintIds3d;

export type HintsCollection = {
  hints2d: Hint2dI[];
  hints3d: Hint3dI[];
};
