import { inject, injectable } from 'inversify';
import * as THREE from 'three';
import { MainScene3dI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { GraphicsEngine3dI } from '../../../../engines/types/interfaces';
import { SceneLightsManagerI } from '../../../components/3d/lights/types/interfaces';

@injectable()
export default class MainScene3d implements MainScene3dI {
  private readonly scene: THREE.Scene;

  private readonly lightsManager: SceneLightsManagerI;

  constructor(
  @inject(TYPES.Engine3d) engine3d: GraphicsEngine3dI,
    @inject(TYPES.SceneLightsManager) lightsManager: SceneLightsManagerI,
  ) {
    this.scene = engine3d.scene;
    this.lightsManager = lightsManager;

    this.addLights();
  }

  private addLights(): void {
    this.lightsManager.getSceneLights().forEach((light) => {
      this.addToScene(light);
    });
  }

  public addToScene(obj: any): void {
    this.scene.add(obj);
  }

  public removeFromScene(obj: any): void {
    this.scene.remove(obj);
  }
}
