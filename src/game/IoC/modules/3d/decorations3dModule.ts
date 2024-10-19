import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { Decorations3dCollection } from '../../../core/scenes/3d/decorations/types/types';
import SkyBackground from '../../../core/scenes/3d/decorations/background/SkyBackground';
import { Decorations3dManagerI } from '../../../core/scenes/3d/decorations/types/interfaces';
import Decorations3dManager from '../../../core/scenes/3d/decorations/Decorations3dManager';
import HouseDecoration from '../../../core/scenes/3d/decorations/house/HouseDecoration';

export const decorations3dModule = new ContainerModule((bind) => {
  bind<Decorations3dCollection>(TYPES.Decorations3dCollection).toDynamicValue((context): Decorations3dCollection => [context.container.resolve(SkyBackground), context.container.resolve(HouseDecoration)]);
  bind<Decorations3dManagerI>(TYPES.Decorations3dManager).to(Decorations3dManager);
});
