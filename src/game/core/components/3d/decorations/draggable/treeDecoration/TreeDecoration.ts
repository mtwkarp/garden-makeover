import { injectable } from 'inversify';
import {
  BoxGeometry, Color, Mesh, MeshStandardMaterial,
} from 'three';
import ModelsCache from '../../../../../../assetsLoaders/ModelsCache';
import AbstractDraggableDecoration from '../AbstractDraggableDecoration';
import { DraggableDecorationNames } from '../../types/enums';

@injectable()
export default class TreeDecoration extends AbstractDraggableDecoration {
  public name = DraggableDecorationNames.tree;

  public createDecoration(): void {
    const tree = ModelsCache.getModel('Tree.fbx');

    tree.scale.set(0.015, 0.015, 0.015);

    this.decorationModel = tree;
  }

  protected override createDecorationHitArea() {
    const size = 1;
    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshStandardMaterial({ color: new Color(1, 1, 1) });

    this.decorationHitArea = new Mesh(geometry, material);
    this.decorationHitArea.position.set(0, size / 2, 0);
  }
}
