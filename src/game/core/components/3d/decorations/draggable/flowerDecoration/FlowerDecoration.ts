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

  public readonly hitAreaHeight = 0.2;

  public createDecoration(): void {
    const flower = ModelsCache.getModel('flower.fbx');

    flower.scale.set(0.005, 0.005, 0.005);

    this.decorationModel = flower;
  }

  protected override createDecorationHitArea() {
    const height = 0.7;
    const geometry = new BoxGeometry(0.2, height, 0.2);
    const material = new MeshStandardMaterial({ color: new Color(1, 1, 1) });

    this.decorationHitArea = new Mesh(geometry, material);
    this.decorationHitArea.position.set(0, height / 2, 0);
  }
}
