import { ContainerModule } from 'inversify';
import { AssetLoadersManagerI, AssetsLoader2dI, AssetsLoader3dI } from '../../../lib/assetsLoaders/types/interfaces';
import { TYPES } from '../../Types';
import AssetsLoader3d from '../../../lib/assetsLoaders/AssetsLoader3d';
import AssetsLoader2d from '../../../lib/assetsLoaders/AssetsLoader2d';
import AssetLoadersManager from '../../../lib/assetsLoaders/AssetLoadersManager';

export const assetLoadersModule = new ContainerModule((bind) => {
  bind<AssetsLoader3dI>(TYPES.AssetLoader3d).to(AssetsLoader3d);
  bind<AssetsLoader2dI>(TYPES.AssetLoader2d).to(AssetsLoader2d);
  bind<AssetLoadersManagerI>(TYPES.AssetLoadersManager).to(AssetLoadersManager);
});
