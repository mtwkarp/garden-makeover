import { Container, injectable } from 'inversify';
import { SceneNames2d } from '../types/enums';
import { MainScene2dI } from './types/interfaces';

@injectable()
export default class MainScene2d extends Container implements MainScene2dI {
  private readonly sceneNames: SceneNames2d[];

  // public showScene(name: SceneNames2d): void {}
  // public hideScene(name: SceneNames2d): void {}
  // public destroyScene(name: SceneNames2d): void {}
}
