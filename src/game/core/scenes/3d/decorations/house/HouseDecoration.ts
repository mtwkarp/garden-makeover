import { injectable } from 'inversify';
import { Decoration3dI } from '../types/interfaces';
import ModelsCache from '../../../../../assetsLoaders/ModelsCache';

@injectable()
export default class HouseDecoration implements Decoration3dI {
  public getDecoration(): any {
    const house = ModelsCache.getModel('House.fbx');
    house.scale.set(0.01, 0.01, 0.01);
    house.position.y = 1;
    house.position.z = -2;
    house.rotation.y = -Math.PI / 2;
    // house.children = house.children.filter((el: any) => !el.isLight)
    // console.log(house.children)
    // house.children.forEach((el: any) => {
    //   if(el.isLight) {
    //     console.log(el)
    //   }
    // })

    // console.log(house.children)
    // house.children[3].visible = false
    // // house.children[10].visible = false
    //
    // // @ts-ignore
    // house.children[10].intensity = 300
    // house.children = house.children.filter
    // ((el: any) => {
    //   if(el.isLight) {
    //     console.log(el)
    //   }
    //
    //   return !el.isLight
    // })

    return house;
  }
}
