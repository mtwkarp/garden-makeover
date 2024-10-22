import { injectable } from 'inversify';
import { Decoration3dI } from '../types/interfaces';
import ModelsCache from '../../../../../assetsLoaders/ModelsCache';

@injectable()
export default class HouseDecoration implements Decoration3dI {
  public getDecoration(): any {
    const house = ModelsCache.getModel('House.fbx');
    house.scale.set(0.01, 0.01, 0.01);
    return house;
  }
}
