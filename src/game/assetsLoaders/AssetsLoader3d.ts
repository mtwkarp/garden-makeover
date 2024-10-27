import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { injectable } from 'inversify';
import {
  AssetData3d, FBXWithMapAsset, Model3dCache, OBJWithMTLAsset,
} from './types/types';
import { AssetsLoader3dI } from './types/interfaces';
import manifest3d from '../../assets/manifestAssets3d.json';
import ModelsCache from './ModelsCache';

@injectable()
export default class AssetsLoader3d implements AssetsLoader3dI {
  private readonly fbxLoader: FBXLoader;

  private readonly objLoader: OBJLoader;

  private readonly mtlLoader: MTLLoader;

  private readonly textureLoader: THREE.TextureLoader;

  constructor() {
    this.fbxLoader = new FBXLoader();
    this.objLoader = new OBJLoader();
    this.mtlLoader = new MTLLoader();
    this.textureLoader = new THREE.TextureLoader();
  }

  public async loadAllAssets(): Promise<void> {
    await this.loadSpecificAssets(manifest3d.assets);
  }

  public async loadSpecificAssets(assets: AssetData3d[]): Promise<void> {
    const promises = assets.map((assetData) => this.loadModel(assetData));

    await Promise.all(promises).then((models) => {
      models.forEach((el) => {
        ModelsCache.addModel(el.model, el.name);
      });
    });
  }

  private loadModel(asset: AssetData3d): Promise<Model3dCache> {
    return new Promise((resolve, reject) => {
      const extension = asset.src.split('.').pop()?.toLowerCase();

      switch (extension) {
        case 'fbx':
          this.loadFBX(asset as FBXWithMapAsset)
            .then((model) => resolve(model))
            .catch(reject);
          break;
        case 'obj':
          this.loadOBJ(asset as OBJWithMTLAsset)
            .then((model) => resolve(model))
            .catch(reject);
          break;
        default:
          reject(`Unsupported file format: ${extension}`);
      }
    });
  }

  private loadFBX(asset: FBXWithMapAsset): Promise<Model3dCache> {
    return new Promise((resolve, reject) => {
      this.fbxLoader.load(
        asset.src,
        (fbx) => {
          if (asset.textures) {
            fbx.traverse((child: THREE.Object3D) => {
              if (child instanceof THREE.Mesh && child.material) {
                const material = child.material as THREE.MeshStandardMaterial;

                if (asset.textures && asset.textures.normal) {
                  material.normalMap = this.textureLoader.load(asset.textures.normal);
                }

                material.needsUpdate = true;
              }
            });
          }

          resolve({ name: asset.alias, model: fbx });
        },
        undefined,
        (error) => reject(`Failed to load FBX model: ${error}`),
      );
    });
  }

  private loadOBJ(asset: OBJWithMTLAsset): Promise<Model3dCache> {
    return new Promise((resolve, reject) => {
      if (asset.mtl) {
        this.mtlLoader.load(
          asset.mtl,
          (materials) => {
            materials.preload();
            this.objLoader.setMaterials(materials);
            this.loadOBJModel(asset.src, asset.alias)
              .then((model) => resolve(model))
              .catch(reject);
          },
          undefined,
          (error) => reject(`Failed to load MTL file: ${error}`),
        );
      } else {
        this.loadOBJModel(asset.src, asset.alias)
          .then((model) => resolve(model))
          .catch(reject);
      }
    });
  }

  private loadOBJModel(url: string, alias: string): Promise<Model3dCache> {
    return new Promise((resolve, reject) => {
      this.objLoader.load(
        url,
        (obj) => resolve({ name: alias, model: obj }),
        undefined,
        (error) => reject(`Failed to load OBJ model: ${error}`),
      );
    });
  }
}
