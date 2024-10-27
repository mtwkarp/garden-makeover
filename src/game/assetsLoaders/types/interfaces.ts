import { AssetData2d, AssetData3d } from './types';

export interface AssetsLoaderI {
  loadAllAssets(): Promise<void>;
}

export interface AssetsLoader2dI extends AssetsLoaderI {
  loadSpecificAssets(data: AssetData2d[]): Promise<void>;
}

export interface AssetsLoader3dI extends AssetsLoaderI {
  loadSpecificAssets(data: AssetData3d[]): Promise<void>;
}

export interface AssetLoadersManagerI extends AssetsLoaderI {
  loadSpecific2dAssets(data: AssetData2d[]): Promise<void>;
  loadSpecific3dAssets(data: AssetData3d[]): Promise<void>;
}
