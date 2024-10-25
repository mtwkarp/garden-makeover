import { ContainerModule } from 'inversify';
import { MainScene3dI } from '../../../core/scenes/3d/mainScene3d/types/interfaces';
import { TYPES } from '../../Types';
import MainScene3d from '../../../core/scenes/3d/mainScene3d/MainScene3d';

export const scene3dModule = new ContainerModule((bind) => {
  bind<MainScene3dI>(TYPES.MainScene3d).to(MainScene3d).inSingletonScope();
});
