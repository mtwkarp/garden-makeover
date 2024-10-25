import { injectable } from 'inversify';
import * as THREE from 'three';
import ModelsCache from '../../../../../../assetsLoaders/ModelsCache';
import AbstractStaticDecoration from '../AbstractStaticDecoration';

@injectable()
export default class HouseDecoration extends AbstractStaticDecoration {
  private house: THREE.Group | THREE.Object3D;

  public getDecoration(): any {
    this.house = ModelsCache.getModel('House.fbx');
    this.house.scale.set(0.01, 0.01, 0.01);
    this.house.position.y = 1;
    this.house.position.z = -2;
    this.house.rotation.y = -Math.PI / 2;

    return this.house;
  }

  public setNightMode(): void {}

  public setDayMode(): void {}
}
