import * as THREE from 'three';
import { injectable } from 'inversify';
import { Light } from 'three';
import AbstractLight from './AbstractLight';

@injectable()
export default class AmbientLight extends AbstractLight {
  protected override light: Light = new THREE.AmbientLight(0xffffff, 0.3);

  protected applyDayTheme(): void {
    this.light.color.set(0xffffff);
    this.light.intensity = 1;
  }

  protected applyNightTheme(): void {
    this.light.color.set(0x222244);
    this.light.intensity = 10;
  }
}
