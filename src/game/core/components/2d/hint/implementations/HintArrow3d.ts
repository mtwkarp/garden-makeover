import { injectable } from 'inversify';
import * as THREE from 'three';
import gsap from 'gsap';
import AbstractHint from '../AbstractHint';
import { HintIds3d } from '../types/enums';
import ModelsCache from '../../../../../assetsLoaders/ModelsCache';
import { Hint3dI, HintIds } from '../types/interfaces';

@injectable()
export default class HintArrow3d extends AbstractHint implements Hint3dI {
  public readonly id: HintIds = HintIds3d.decorationTargetAreaHintArrow;

  private hintModel: THREE.Group<THREE.Object3DEventMap> | THREE.Object3D<THREE.Object3DEventMap> | null;

  private animationStarted: boolean = false;

  public initialize(): void {
    this.createChildren();
    this.animate();
    this.hide();
  }

  private createChildren(): void {
    this.hintModel = ModelsCache.getModel('hint-arrow.fbx');
    this.hintModel.scale.set(0.004, 0.004, 0.004);
    this.hintModel.rotation.y = Math.PI / 2;
    this.hintModel.visible = false;
  }

  private animate(): void {
    if (this.animationStarted || !this.hintModel) {
      return;
    }

    this.animationStarted = true;

    gsap.to(this.hintModel.position, {
      duration: 0.7,
      y: 0.2,
      yoyo: true,
      ease: 'power1.inOut',
      repeat: -1,
    });
  }

  public get view(): any {
    if (!this.hintModel) {
      throw new Error(`Initialize hint first! Hint id - ${this.id}`);
    }

    return this.hintModel;
  }

  public display(): void {
    if (!this.hintModel) {
      return;
    }

    this.hintModel.visible = true;
    this.animate();
  }

  public hide(): void {
    if (!this.hintModel) {
      return;
    }

    this.hintModel.visible = false;
  }

  public setPosition(position: { x: number; y: number; z: number }): void {
    if (!this.hintModel) {
      return;
    }

    this.hintModel.position.set(position.x, position.y, position.z);
  }
}
