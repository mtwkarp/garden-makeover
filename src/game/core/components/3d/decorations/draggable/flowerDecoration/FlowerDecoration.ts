import { injectable } from 'inversify';
import ModelsCache from '../../../../../../assetsLoaders/ModelsCache';
import AbstractDraggableDecoration from '../AbstractDraggableDecoration';
import { DraggableDecorationNames } from '../../types/enums';

@injectable()
export default class FlowerDecoration extends AbstractDraggableDecoration {
  public name = DraggableDecorationNames.flower;

  public getDecoration(): any {
    const flower = ModelsCache.getModel('flower.fbx');

    return flower;
  }
}
