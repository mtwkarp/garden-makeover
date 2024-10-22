import { inject, injectable } from 'inversify';
import { Sky } from 'three/examples/jsm/objects/Sky';
import * as THREE from 'three';
import { EventEmitter } from 'pixi.js';
import { TYPES } from '../../../../../IoC/Types';
import { Decoration3dI } from '../types/interfaces';
import { GraphicsEngine3dI } from '../../../../../engines/types/interfaces';
import { GameGlobalEvents } from '../../../../events/types/enums';

@injectable()
export default class SkyBackground implements Decoration3dI {
  private readonly renderer: THREE.WebGLRenderer;

  private readonly eventsManager: EventEmitter;

  private mode: 'day' | 'night' = 'day';

  private sky: Sky | undefined;

  constructor(
  @inject(TYPES.Engine3d) engine3d: GraphicsEngine3dI,
    @inject(TYPES.GlobalEventsManager) eventsManager: EventEmitter,
  ) {
    this.eventsManager = eventsManager;
    this.renderer = engine3d.getRenderer();
    this.subscribe();
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

    if (!this.sky) {
      return;
    }

    const { uniforms } = this.sky.material;
    uniforms.turbidity.value = 5;
    uniforms.rayleigh.value = 3;
  }

  private setNightMode(): void {
    this.mode = 'night';

    if (!this.sky) {
      return;
    }

    const { uniforms } = this.sky.material;
    uniforms.turbidity.value = 1;
    uniforms.rayleigh.value = 10;
  }

  public getDecoration(): any {
    this.sky = new Sky();
    this.sky.scale.setScalar(450000);

    const sun = new THREE.Vector3();
    const effects = {
      turbidity: 5,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 2,
      azimuth: 180,
      exposure: this.renderer.toneMappingExposure,
    };

    const { uniforms } = this.sky.material;
    uniforms.turbidity.value = effects.turbidity;
    uniforms.rayleigh.value = effects.rayleigh;
    uniforms.mieCoefficient.value = effects.mieCoefficient;
    uniforms.mieDirectionalG.value = effects.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - effects.elevation);
    const theta = THREE.MathUtils.degToRad(effects.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms.sunPosition.value.copy(sun);

    this.renderer.toneMappingExposure = effects.exposure;

    return this.sky;
  }
}
