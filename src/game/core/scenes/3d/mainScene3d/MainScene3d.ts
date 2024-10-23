import { inject, injectable } from 'inversify';
import * as THREE from 'three';
import { MainScene3dI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { GraphicsEngine3dI } from '../../../../engines/types/interfaces';
import { SceneLightI } from '../../../components/3d/light/types/interaces';

@injectable()
export default class MainScene3d implements MainScene3dI {
  private readonly scene: THREE.Scene;

  constructor(@inject(TYPES.Engine3d) engine3d: GraphicsEngine3dI, @inject(TYPES.SceneLight) sceneLight: SceneLightI) {
    this.scene = engine3d.scene;
    sceneLight.setScene(this.scene);
  }

  public addToScene(obj: any): void {
    this.scene.add(obj);
  }

  public removeFromScene(obj: any): void {
    this.scene.remove(obj);
  }
}
