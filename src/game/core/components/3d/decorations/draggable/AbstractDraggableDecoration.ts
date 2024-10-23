import { injectable } from 'inversify';
import { Group, Object3D, Object3DEventMap } from 'three';
import gsap from 'gsap';
import { DraggableDecoration3dI } from '../types/interfaces';
import { DraggableDecorationNames } from '../types/enums';

@injectable()
export default abstract class AbstractDraggableDecoration implements DraggableDecoration3dI {
  public abstract name: DraggableDecorationNames;

  protected decorationModel: Group<Object3DEventMap> | Object3D<Object3DEventMap>;

  protected decorationHitArea: Object3D<Object3DEventMap>;

  public animatePlacing(): void {}

  public getDecoration(): any {
    if (!this.decorationModel) {
      this.createDecoration();
    }

    return this.decorationModel;
  }

  public abstract createDecoration(): void;

  protected abstract createDecorationHitArea(): void;

  public getDecorationHitArea(): Object3D<Object3DEventMap> {
    if (!this.decorationHitArea) {
      this.createDecorationHitArea();
    }

    return this.decorationHitArea;
  }

  public animatePlacingDecorationOnScene(): void {
    const scaleModifierValue: number = 0.001;
    const yScale = this.decorationModel.scale.y;
    const timeline = gsap.timeline({ repeat: 0 }); // No repeat, only one cycle

    timeline.to(this.decorationModel.scale, {
      duration: 0.15,
      y: yScale - scaleModifierValue,
      ease: 'bounce.in',
    });

    timeline.to(this.decorationModel.scale, {
      duration: 0.3,
      y: yScale,
      ease: 'bounce.out',
    });
  }
}
