import * as THREE from 'three';

export type AssetData2d = {
  alias: string;
  src: string;
};

export type TextureMap3d = {
  [key: string]: string;
};

export type FBXWithMapAsset = {
  alias: string;
  src: string;
  textures: {
    [key: string]: string;
  } | null;
};

export type OBJWithMTLAsset = {
  alias: string;
  src: string;
  mtl: string;
};

export type OBJWithoutMTLAsset = {
  alias: string;
  src: string;
  mtl: null;
};

export type AssetData3d = FBXWithMapAsset | OBJWithMTLAsset | OBJWithoutMTLAsset;

export type Model3dCache = { name: string; model: THREE.Group | THREE.Object3D };
