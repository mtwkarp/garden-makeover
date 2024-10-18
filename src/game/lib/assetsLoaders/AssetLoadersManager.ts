import { inject, injectable } from 'inversify';
import { AssetLoadersManagerI, AssetsLoader2dI, AssetsLoader3dI } from './types/interfaces';
import { TYPES } from '../../IoC/Types';
import { AssetData2d, AssetData3d } from './types/types';

@injectable()
export default class AssetLoadersManager implements AssetLoadersManagerI {
  private readonly assetLoader2d: AssetsLoader2dI;

  private readonly assetLoader3d: AssetsLoader3dI;

  constructor(
  @inject(TYPES.AssetLoader3d) assetLoader3d: AssetsLoader3dI,
    @inject(TYPES.AssetLoader2d) assetLoader2d: AssetsLoader2dI,
  ) {
    this.assetLoader2d = assetLoader2d;
    this.assetLoader3d = assetLoader3d;
  }

  public async loadAllAssets(): Promise<void> {
    await this.assetLoader2d.loadAllAssets();
    await this.assetLoader3d.loadAllAssets();
  }

  public async loadSpecific2dAssets(data: AssetData2d[]): Promise<void> {
    await this.assetLoader2d.loadSpecificAssets(data);
  }

  public async loadSpecific3dAssets(data: AssetData3d[]): Promise<void> {
    await this.assetLoader3d.loadSpecificAssets(data);
  }
}
