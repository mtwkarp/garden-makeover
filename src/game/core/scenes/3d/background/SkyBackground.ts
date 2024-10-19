import { inject, injectable } from 'inversify';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { TYPES } from '../../../../IoC/Types';
import { MainScene3dI } from '../mainScene3d/types/interfaces';

@injectable()
export default class SkyBackground {
  private readonly scene: MainScene3dI;

  constructor(@inject(TYPES.MainScene3d) mainScene3d: MainScene3dI) {
    this.scene = mainScene3d;
    this.createSky();
  }

  private createSky(): void {
    const sky = new Sky();

    sky.scale.setScalar(450000);
    this.scene.addToScene(sky);
  }
}
