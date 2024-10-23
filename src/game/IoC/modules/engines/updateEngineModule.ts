import { ContainerModule } from 'inversify';
import { UpdateEngineI } from '../../../engines/types/interfaces';
import { TYPES } from '../../Types';
import GsapUpdateEngine from '../../../engines/updateEngine/GsapUpdateEngine';

export const updateEngineModule = new ContainerModule((bind) => {
  bind<UpdateEngineI>(TYPES.UpdateEngine).to(GsapUpdateEngine).inSingletonScope();
});
