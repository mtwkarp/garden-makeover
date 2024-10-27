import { SceneNames2d } from './enums';
import { Scene2dI } from '../../../../lib/2d/types/interfaces';

export type Scenes2dByNames = Partial<Record<SceneNames2d, Scene2dI>>;

export type Scenes2dGetter = (sceneName: SceneNames2d) => Scene2dI;
