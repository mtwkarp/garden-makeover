import { injectable } from 'inversify';
import ModelsCache from '../../../../../../assetsLoaders/ModelsCache';
import AbstractDraggableDecoration from '../AbstractDraggableDecoration';
import { DraggableDecorationNames } from '../../types/enums';

@injectable()
export default class BushDecoration extends AbstractDraggableDecoration {
  public name = DraggableDecorationNames.bush;

  public getDecoration(): any {
    const bush = ModelsCache.getModel('BushWithBerrys.fbx');

    return bush;
  }
}
