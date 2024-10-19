import { inject, injectable } from 'inversify';
import * as THREE from 'three';
import { TYPES } from '../../../../../IoC/Types';
import { Decoration3dI } from '../types/interfaces';
import { GraphicsEngine3dI } from '../../../../../engines/types/interfaces';
import ModelsCache from '../../../../../assetsLoaders/ModelsCache';

@injectable()
export default class HouseDecoration implements Decoration3dI {
  private readonly renderer: THREE.WebGLRenderer;

  constructor(@inject(TYPES.Engine3d) engine3d: GraphicsEngine3dI) {
    this.renderer = engine3d.getRenderer();
  }

  public getDecoration(): any {
    const house = ModelsCache.getModel('House.fbx');
    house.scale.set(0.1, 0.1, 0.1);
    return house;
  }
}
