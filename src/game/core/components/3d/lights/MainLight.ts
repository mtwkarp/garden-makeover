import * as THREE from 'three';
import { injectable } from 'inversify';
import { Light } from 'three';
import AbstractLight from './AbstractLight';

@injectable()
export default class MainLight extends AbstractLight {
  protected override light: Light = new THREE.DirectionalLight(0xffffff, 0.1);

  constructor() {
    super();
    this.light.castShadow = true;
  }

  protected applyDayTheme(): void {
    this.light.color.set(0xffffff);
    this.light.intensity = 30;
    this.light.position.set(50, 100, 50);
  }

  protected applyNightTheme(): void {
    this.light.color.set(0x333366);
    this.light.intensity = 20;
    this.light.position.set(-50, 50, -50);
  }
}
