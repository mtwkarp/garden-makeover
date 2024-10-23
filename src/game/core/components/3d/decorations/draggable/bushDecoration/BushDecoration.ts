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

  public createDecoration(): void {
    const bush = ModelsCache.getModel('BushWithBerrys.fbx');

    bush.scale.set(0.007, 0.007, 0.007);

    this.decorationModel = bush;
  }

  protected override createDecorationHitArea(): void {
    const height = 0.5;
    const geometry = new BoxGeometry(0.8, height, 0.8);
    const material = new MeshStandardMaterial({ color: new Color(1, 1, 1) });

    this.decorationHitArea = new Mesh(geometry, material);
    this.decorationHitArea.visible = false;
    this.decorationHitArea.position.set(0, height / 2, 0);
  }
}
