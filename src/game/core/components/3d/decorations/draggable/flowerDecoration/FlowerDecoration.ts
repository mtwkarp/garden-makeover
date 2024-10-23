import { injectable } from 'inversify';
import {
  BoxGeometry, Color, Mesh, MeshStandardMaterial,
} from 'three';
import ModelsCache from '../../../../../../assetsLoaders/ModelsCache';
import AbstractDraggableDecoration from '../AbstractDraggableDecoration';
import { DraggableDecorationNames } from '../../types/enums';

@injectable()
export default class FlowerDecoration extends AbstractDraggableDecoration {
  public name = DraggableDecorationNames.flower;

  public createDecoration(): void {
    const flower = ModelsCache.getModel('flower.fbx');

    flower.scale.set(0.005, 0.005, 0.005);

    this.decorationModel = flower;
  }

  protected override createDecorationHitArea() {
    const size = 1;
    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshStandardMaterial({ color: new Color(1, 1, 1) });

    this.decorationHitArea = new Mesh(geometry, material);
    this.decorationHitArea.position.set(0, size / 2, 0);
  }
}
