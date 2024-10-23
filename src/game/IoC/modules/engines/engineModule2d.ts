import { ContainerModule } from 'inversify';
import { GraphicsEngineI } from '../../../engines/types/interfaces';
import { TYPES } from '../../Types';
import Pixi2dEngine from '../../../engines/2dEngine/Pixi2dEngine';

export const engineModule2d = new ContainerModule((bind) => {
  bind<GraphicsEngineI>(TYPES.Engine2d).to(Pixi2dEngine).inSingletonScope();
});
