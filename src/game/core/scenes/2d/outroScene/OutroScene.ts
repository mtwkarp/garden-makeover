import { Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';

export default class OutroScene extends PixiScene implements Scene2dI {
  constructor() {
    super();
  }

  public get sceneName(): string {
    return SceneNames2d.outro;
  }
}
