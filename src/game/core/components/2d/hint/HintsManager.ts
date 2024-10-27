import { inject, injectable } from 'inversify';
import { ContainerI } from '../../../../lib/2d/types/interfaces';
import { MainScene3dI } from '../../../scenes/3d/mainScene3d/types/interfaces';
import {
  Hint2dI, Hint3dI, HintIds, HintsCollection, HintsManagerI,
} from './types/interfaces';
import { HintIds2d, HintIds3d } from './types/enums';
import { TYPES } from '../../../../IoC/Types';

@injectable()
export default class HintsManager implements HintsManagerI {
  private readonly hints2D: Map<HintIds, Hint2dI> = new Map();

  private readonly hints3D: Map<HintIds, Hint3dI> = new Map();

  private readonly hintsCollection: HintsCollection;

  constructor(@inject(TYPES.HintsCollection) hintsCollection: HintsCollection) {
    this.hintsCollection = hintsCollection;
    this.initialize();
  }

  private initialize(): void {
    this.setupHints();
  }

  private setupHints(): void {
    this.hintsCollection.hints2d.forEach((hint) => this.hints2D.set(hint.id, hint));
    this.hintsCollection.hints3d.forEach((hint) => this.hints3D.set(hint.id, hint));
  }

  public add2DHint(hintId: HintIds2d, container: ContainerI, position: { x: number; y: number }): void {
    const hint2D = this.hints2D.get(hintId);

    if (!hint2D) {
      throw new Error(`No 2d hint found with id: ${hintId}`);
    }

    hint2D.initialize();
    hint2D.setPosition(position);
    container.addChild(hint2D.view);
  }

  public add3DHint(hintId: HintIds3d, scene: MainScene3dI, position: { x: number; y: number; z: number }): void {
    const hint3D = this.hints3D.get(hintId);

    if (!hint3D) {
      throw new Error(`No 3d hint found with id: ${hintId}`);
    }

    hint3D.initialize();
    hint3D.setPosition(position);
    scene.addToScene(hint3D.view);
  }

  public displayHint(hintId: HintIds): void {
    const hint2D = this.hints2D.get(hintId);
    if (hint2D && hint2D.shouldDisplay()) {
      hint2D.display();
    }

    const hint3D = this.hints3D.get(hintId);
    if (hint3D && hint3D.shouldDisplay()) {
      hint3D.display();
    }
  }

  public hideHintAsCompleted(hintId: HintIds): void {
    const hint2D = this.hints2D.get(hintId);
    if (hint2D) {
      hint2D.hide();
      hint2D.markCompleted();
    }

    const hint3D = this.hints3D.get(hintId);
    if (hint3D) {
      hint3D.hide();
      hint3D.markCompleted();
    }
  }

  public hideHintAsNotCompleted(hintId: HintIds): void {
    const hint2D = this.hints2D.get(hintId);
    if (hint2D) {
      hint2D.hide();
    }

    const hint3D = this.hints3D.get(hintId);
    if (hint3D) {
      hint3D.hide();
    }
  }
}
