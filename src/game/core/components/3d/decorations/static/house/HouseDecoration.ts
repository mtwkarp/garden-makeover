import { injectable } from 'inversify';
import { Decoration3dI } from '../../types/interfaces';
import ModelsCache from '../../../../../../assetsLoaders/ModelsCache';

@injectable()
export default class HouseDecoration implements Decoration3dI {
  public getDecoration(): any {
    const house = ModelsCache.getModel('House.fbx');
    house.scale.set(0.01, 0.01, 0.01);
    house.position.y = 1;
    house.position.z = -2;
    house.rotation.y = -Math.PI / 2;

    return house;
  }
}
