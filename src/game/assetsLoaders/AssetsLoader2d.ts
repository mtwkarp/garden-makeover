import { Assets } from 'pixi.js';
import { injectable } from 'inversify';
import { AssetData2d } from './types/types';
import manifest2d from '../../assets/manifestAssets2d.json';
import { AssetsLoader2dI } from './types/interfaces';

@injectable()
export default class AssetsLoader2d implements AssetsLoader2dI {
  private readonly assets: AssetData2d[];

  private readonly loadedAssetsNames: string[] = [];

  constructor() {
    this.assets = manifest2d.assets;
  }

  public async loadAllAssets(): Promise<void> {
    await this.loadSpecificAssets(this.assets);
  }

  public async loadSpecificAssets(assets: AssetData2d[]): Promise<void> {
    const filteredAssets = assets.filter((el) => !this.loadedAssetsNames.includes(el.alias));
    const assetNames = filteredAssets.map((asset) => asset.alias);

    filteredAssets.forEach((asset) => {
      Assets.add(asset);
    });

    this.loadedAssetsNames.push(...assetNames);

    await Assets.load(assetNames);
  }
}
