import { inject, injectable } from 'inversify';
import * as THREE from 'three';
import { MainScene3dI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { GraphicsEngine3dI } from '../../../../engines/types/interfaces';

@injectable()
export default class MainScene3d implements MainScene3dI {
  private readonly scene: THREE.Scene;

  constructor(@inject(TYPES.Engine3d) engine3d: GraphicsEngine3dI) {
    this.scene = engine3d.scene;
  }

  public addToScene(obj: any): void {
    this.scene.add(obj);
  }
}
