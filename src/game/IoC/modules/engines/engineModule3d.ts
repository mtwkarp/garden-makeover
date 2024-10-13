import { ContainerModule } from 'inversify';
import { GraphicsEngineI } from '../../../engines/types/interfaces';
import { TYPES } from '../../Types';
import Three3dEngine from '../../../engines/3dEngine/Three3dEngine';

export const engineModule3d = new ContainerModule((bind) => {
  bind<GraphicsEngineI>(TYPES.Engine3d).to(Three3dEngine).inSingletonScope();
});
