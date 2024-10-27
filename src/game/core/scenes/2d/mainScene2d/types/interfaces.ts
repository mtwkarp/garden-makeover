import { SceneNames2d } from '../../types/enums';
import { ContainerI } from '../../../../../lib/2d/types/interfaces';

export interface MainScene2dI extends ContainerI {
  showScene(name: SceneNames2d): void;
  hideScene(name: SceneNames2d): void;
  destroyScene(name: SceneNames2d): void;
}
