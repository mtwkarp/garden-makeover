import { inject, injectable } from 'inversify';
import { Sky } from 'three/examples/jsm/objects/Sky';
import * as THREE from 'three';
import { TYPES } from '../../../../../../IoC/Types';
import { GraphicsEngine3dI } from '../../../../../../engines/types/interfaces';
import AbstractStaticDecoration from '../AbstractStaticDecoration';

@injectable()
export default class SkyBackground extends AbstractStaticDecoration {
  private readonly renderer: THREE.WebGLRenderer;

  private sky: Sky | undefined;

  constructor(@inject(TYPES.Engine3d) engine3d: GraphicsEngine3dI) {
    super();
    this.renderer = engine3d.getRenderer();
  }

  protected setDayMode(): void {
    if (!this.sky) {
      return;
    }

    const { uniforms } = this.sky.material;
    uniforms.turbidity.value = 5;
    uniforms.rayleigh.value = 3;
  }

  protected setNightMode(): void {
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
