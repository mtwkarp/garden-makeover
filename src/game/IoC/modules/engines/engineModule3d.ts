import { ContainerModule } from 'inversify';
import { GraphicsEngine3dI } from '../../../engines/types/interfaces';
import { TYPES } from '../../Types';
import Three3dEngine from '../../../engines/3dEngine/Three3dEngine';

export const engineModule3d = new ContainerModule((bind) => {
  bind<GraphicsEngine3dI>(TYPES.Engine3d).to(Three3dEngine).inSingletonScope();
});
