import { injectable } from 'inversify';
import ModelsCache from '../../../../../../assetsLoaders/ModelsCache';
import AbstractDraggableDecoration from '../AbstractDraggableDecoration';
import { DraggableDecorationNames } from '../../types/enums';

@injectable()
export default class TreeDecoration extends AbstractDraggableDecoration {
  public name = DraggableDecorationNames.tree;

  public getDecoration(): any {
    const flower = ModelsCache.getModel('Tree.fbx');

    return flower;
  }
}
