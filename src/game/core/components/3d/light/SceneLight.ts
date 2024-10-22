import { inject, injectable } from 'inversify';
import { EventEmitter } from 'pixi.js';
import * as THREE from 'three';
import { SceneLightI } from './types/interaces';
import { TYPES } from '../../../../IoC/Types';
import { GameGlobalEvents } from '../../../events/types/enums';

@injectable()
export default class SceneLight implements SceneLightI {
  private mode: 'day' | 'night' = 'day';

  private readonly eventsManager: EventEmitter;

  private mainLight: THREE.DirectionalLight;

  private ambientLight: THREE.AmbientLight;

  private fillLight: THREE.HemisphereLight;

  constructor(@inject(TYPES.GlobalEventsManager) eventsManager: EventEmitter) {
    this.eventsManager = eventsManager;

    this.initialize();
  }

  private initialize(): void {
    this.createLights();
    this.subscribe();
  }

  private createLights(): void {
    this.mainLight = new THREE.DirectionalLight(0xffffff, 0.1);
    this.mainLight.position.set(50, 100, 50);
    this.mainLight.castShadow = true;

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

    this.fillLight = new THREE.HemisphereLight(0x87ceeb, 0x444444, 0.4); // Sky color, ground color, intensity
    this.fillLight.position.set(0, 50, 0);
  }

  private addLightsToScene(scene: any): void {
    if (!scene) {
      throw new Error('No scene was found.');
    }

    scene.add(this.mainLight, this.ambientLight, this.fillLight);
  }

  public setScene(scene: any): void {
    this.addLightsToScene(scene);
    this.setDayMode();
  }

  private subscribe(): void {
    this.eventsManager.on(GameGlobalEvents.changeLightningButtonClick, this.toggleLightMode, this);
  }

  private toggleLightMode(): void {
    if (this.mode === 'day') {
      this.setNightMode();
    } else {
      this.setDayMode();
    }
  }

  private setDayMode(): void {
    this.mode = 'day';

    this.mainLight.color.set(0xffffff);
    this.mainLight.intensity = 50;
    this.mainLight.position.set(50, 100, 50);

    this.ambientLight.color.set(0xffffff);
    this.ambientLight.intensity = 1;

    this.fillLight.color.set(0x87ceeb);
    this.fillLight.groundColor.set(0x444444);
    this.fillLight.intensity = 1;
  }

  private setNightMode(): void {
    this.mode = 'night';

    this.mainLight.color.set(0x333366);
    this.mainLight.intensity = 20;
    this.mainLight.position.set(-50, 50, -50);

    this.ambientLight.color.set(0x222244);
    this.ambientLight.intensity = 10;

    this.fillLight.color.set(0x444466);
    this.fillLight.groundColor.set(0x111122);
    this.fillLight.intensity = 50;
  }
}
