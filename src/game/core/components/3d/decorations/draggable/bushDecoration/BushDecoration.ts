import { injectable } from 'inversify';
import {
  BoxGeometry, Color, Mesh, MeshStandardMaterial,
} from 'three';
import ModelsCache from '../../../../../../assetsLoaders/ModelsCache';
import AbstractDraggableDecoration from '../AbstractDraggableDecoration';
import { DraggableDecorationNames } from '../../types/enums';

@injectable()
export default class BushDecoration extends AbstractDraggableDecoration {
  public name = DraggableDecorationNames.bush;

  public createDecoration() {
    const bush = ModelsCache.getModel('BushWithBerrys.fbx');

    bush.scale.set(0.007, 0.007, 0.007);

    this.decorationModel = bush;
  }

  protected override createDecorationHitArea() {
    const size = 1;
    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshStandardMaterial({ color: new Color(1, 1, 1) });

    this.decorationHitArea = new Mesh(geometry, material);
    this.decorationHitArea.position.set(0, size / 2, 0);
  }
}
