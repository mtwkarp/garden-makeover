import { inject, injectable } from 'inversify';
import { Sky } from 'three/examples/jsm/objects/Sky';
import * as THREE from 'three';
import { TYPES } from '../../../../../IoC/Types';
import { Decoration3dI } from '../types/interfaces';
import { GraphicsEngine3dI } from '../../../../../engines/types/interfaces';

@injectable()
export default class SkyBackground implements Decoration3dI {
  private readonly renderer: THREE.WebGLRenderer;

  constructor(@inject(TYPES.Engine3d) engine3d: GraphicsEngine3dI) {
    this.renderer = engine3d.getRenderer();
  }

  public getDecoration(): any {
    const sky = new Sky();
    sky.scale.setScalar(450000);

    const sun = new THREE.Vector3();
    const effects = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 2,
      azimuth: 180,
      exposure: this.renderer.toneMappingExposure,
    };

    const { uniforms } = sky.material;
    uniforms.turbidity.value = effects.turbidity;
    uniforms.rayleigh.value = effects.rayleigh;
    uniforms.mieCoefficient.value = effects.mieCoefficient;
    uniforms.mieDirectionalG.value = effects.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - effects.elevation);
    const theta = THREE.MathUtils.degToRad(effects.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms.sunPosition.value.copy(sun);

    this.renderer.toneMappingExposure = effects.exposure;

    return sky;
  }
}
