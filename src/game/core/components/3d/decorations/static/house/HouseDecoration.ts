import { injectable } from 'inversify';
import * as THREE from 'three';
import ModelsCache from '../../../../../../assetsLoaders/ModelsCache';
import AbstractStaticDecoration from '../AbstractStaticDecoration';

@injectable()
export default class HouseDecoration extends AbstractStaticDecoration {
  private house: THREE.Group | THREE.Object3D;

  private nightLights: THREE.Light[] = [];

  private dayLights: THREE.Light[] = [];

  private setupLights(): void {
    const nightLightNames: string[] = ['Sun', 'Sun001', 'Sun002'];
    const dayLightNames: string[] = ['Light', 'Light001'];

    this.nightLights = this.getLightsByName(nightLightNames);
    this.dayLights = this.getLightsByName(dayLightNames);
  }

  private getLightsByName(names: string[]): THREE.Light[] {
    return names.map((nightLightName) => {
      const light = this.house.getObjectByName(nightLightName);

      if (!light) {
        throw new Error(`Light not found, supplied name: ${nightLightName}`);
      }

      return light as THREE.Light;
    });
  }

  public getDecoration(): any {
    this.house = ModelsCache.getModel('House.fbx');
    this.house.scale.set(0.01, 0.01, 0.01);
    this.house.position.y = 1;
    this.house.position.z = -2;
    this.house.rotation.y = -Math.PI / 2;
    this.setupLights();

    return this.house;
  }

  public setNightMode(): void {
    const light1 = this.house.getObjectByName('Sun') as THREE.Light;
    const light2 = this.house.getObjectByName('Sun001') as THREE.Light;
    const light3 = this.house.getObjectByName('Sun002') as THREE.Light;

    light1.intensity = 0;
    light2.intensity = 200;
    light3.intensity = 350;

    this.dayLights.forEach((light) => (light.visible = false));
    this.nightLights.forEach((light) => (light.visible = true));
  }

  public setDayMode(): void {
    const light1 = this.house.getObjectByName('Light') as THREE.Light;
    const light2 = this.house.getObjectByName('Light001') as THREE.Light;

    light1.intensity = 10;
    light2.intensity = 400;

    this.dayLights.forEach((light) => (light.visible = true));
    this.nightLights.forEach((light) => (light.visible = false));
  }
}
