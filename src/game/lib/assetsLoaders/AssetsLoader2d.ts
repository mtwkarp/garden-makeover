import { Assets } from 'pixi.js';
import { AssetData2d } from './types/types';
import manifest2d from '../../../assets/manifestAssets2d.json';
import { AssetsLoader2dI } from './types/interfaces';

export default class AssetsLoader2d implements AssetsLoader2dI {
  private readonly assets: AssetData2d[];

  constructor() {
    this.assets = manifest2d.assets;
  }

  public async loadAllAssets(): Promise<void> {
    await this.loadSpecificAssets(this.assets);
  }

  public async loadSpecificAssets(assets: AssetData2d[]): Promise<void> {
    const assetNames = assets.map((asset) => asset.alias);

    assets.forEach((asset) => {
      Assets.add(asset);
    });

    await Assets.load(assetNames);
  }
}
