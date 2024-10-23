import * as THREE from 'three';
import { injectable } from 'inversify';
import { Group, Object3D, Object3DEventMap } from 'three';
import gsap from 'gsap';
import { DecorationTargetAreaI } from '../types/interfaces';
import ModelsCache from '../../../../../assetsLoaders/ModelsCache';

@injectable()
export default class DecorationTargetArea implements DecorationTargetAreaI {
  private targetArea: THREE.Mesh;

  public disabled: boolean = false;

  protected hintModel: Group<Object3DEventMap> | Object3D<Object3DEventMap> | null = null;

  protected hintAnimation: gsap.core.Tween | null = null;

  constructor() {
    this.createTargetArea();
  }

  private createTargetArea(): void {
    const color = new THREE.Color(0xff0000);
    const radius = 0.3;
    const geometry = new THREE.RingGeometry(radius - 0.1, radius, 64);
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      emissive: new THREE.Color(color),
      emissiveIntensity: 1,
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.x = -Math.PI / 2;

    this.targetArea = mesh;
  }

  public getDecorationTargetArea(): THREE.Mesh {
    return this.targetArea;
  }

  public setPosition(position: { x: number; y: number; z: number }): void {
    this.targetArea.position.set(position.x, position.y, position.z);
  }

  public displayHint(): void {
    this.hintModel = ModelsCache.getModel('hint-arrow.fbx');
    this.hintModel.scale.set(0.004, 0.004, 0.004);
    this.hintModel.position.set(0.09, 0.5, 0);
    this.hintModel.rotation.x = Math.PI / 2;
    this.hintModel.rotation.y = Math.PI / 2;
    this.hintModel.visible = true;

    this.hintAnimation = gsap.to(this.hintModel.position, {
      duration: 0.7,
      z: 0.2,
      yoyo: true,
      ease: 'power1.inOut',
      repeat: -1,
    });

    this.targetArea.add(this.hintModel);
  }

  public hideHint(): void {
    if (this.hintAnimation && this.hintModel) {
      this.hintModel.visible = false;
      this.hintAnimation.kill();
      this.hintModel = null;
      this.hintAnimation = null;
    }
  }

  public hide(): void {
    this.targetArea.visible = false;
  }

  public display(): void {
    if (this.disabled) {
      return;
    }

    this.targetArea.visible = true;
  }

  public disableForever(): void {
    this.hide();
    this.disabled = true;
  }
}
