import { Color, Light } from 'three';
import { injectable } from 'inversify';
import { LightI } from './types/interfaces';

@injectable()
export default class ThreeLight implements LightI {
  protected readonly light: Light;

  public setPosition(x: number, y: number, z: number): void {
    this.light.position.set(x, y, z);
  }

  public setColor(color: number): void {
    this.light.color = new Color(color);
  }

  public setIntensity(intensity: number): void {
    this.light.intensity = intensity;
  }

  public setCastShadow(cast: boolean): void {
    this.light.castShadow = cast;
  }

  public lookAt(x: number, y: number, z: number): void {
    this.light.lookAt(x, y, z);
  }

  public get view(): any {
    return this.light;
  }
}
