import { Assets } from 'pixi.js';
import { Asset2d } from './types/types';
import assets2d from '../../assets/manifestAssets2d.json';

export default class AssetsPreloader2d {
  private readonly assets: Asset2d[];

  constructor() {
    this.assets = assets2d.assets;
  }

  public async loadAllAssets(): Promise<void> {
    return this.loadSpecificAssets(this.assets);
  }

  public async loadSpecificAssets(assets: Asset2d[]): Promise<void> {
    const assetNames = assets.map((asset) => asset.alias);

    assets.forEach((asset) => {
      Assets.add(asset);
    });

    await Assets.load(assetNames);
  }
}
