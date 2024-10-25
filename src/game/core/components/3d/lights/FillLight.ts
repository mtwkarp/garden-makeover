import * as THREE from 'three';
import { injectable } from 'inversify';
import AbstractLight from './AbstractLight';

@injectable()
export default class FillLight extends AbstractLight {
  protected override light: THREE.HemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x444444, 0.4);

  protected applyDayTheme(): void {
    this.light.color.set(0xffffff);
    this.light.groundColor.set(0xfaa0a0);
    this.light.intensity = 1;
  }

  protected applyNightTheme(): void {
    this.light.color.set(0xc3b1e1);
    this.light.groundColor.set(0x7f00ff);
    this.light.intensity = 10;
  }
}
