import { ContainerModule } from 'inversify';
import { MainScene3dI } from '../../../core/scenes/3d/mainScene3d/types/interfaces';
import { TYPES } from '../../Types';
import MainScene3d from '../../../core/scenes/3d/mainScene3d/MainScene3d';
import { SceneLightI } from '../../../core/components/3d/light/types/interaces';
import SceneLight from '../../../core/components/3d/light/SceneLight';

export const scene3dModule = new ContainerModule((bind) => {
  bind<MainScene3dI>(TYPES.MainScene3d).to(MainScene3d).inSingletonScope();
  bind<SceneLightI>(TYPES.SceneLight).to(SceneLight);
});
