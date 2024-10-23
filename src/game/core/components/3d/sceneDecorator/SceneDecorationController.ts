import { inject, injectable } from 'inversify';
import { EventEmitter } from 'pixi.js';
import { SceneDecorationControllerI } from './types/interfaces';
import { DraggableDecorationNames } from '../decorations/types/enums';
import { TYPES } from '../../../../IoC/Types';
import { MainScene3dI } from '../../../scenes/3d/mainScene3d/types/interfaces';
import { DecorationTargetAreasControllerI } from '../targetArea/types/interfaces';
import { GameGlobalEvents } from '../../../events/types/enums';
import { DecorationButtonNames } from '../../2d/buttons/decoration/types/enums';
import { DraggableDecoration3dI, DraggableDecorations3dManagerI } from '../decorations/types/interfaces';

@injectable()
export default class SceneDecorationController implements SceneDecorationControllerI {
  private readonly scene: MainScene3dI;

  private readonly targetAreasController: DecorationTargetAreasControllerI;

  private currentDecoration: DraggableDecoration3dI | null = null;

  private draggableObjects: DraggableDecoration3dI[] = [];

  private readonly draggableDecorationsManager: DraggableDecorations3dManagerI;

  private readonly eventsManager: EventEmitter;

  constructor(
  @inject(TYPES.MainScene3d) scene: MainScene3dI,
    @inject(TYPES.DecorationTargetAreasController) targetAreasController: DecorationTargetAreasControllerI,
    @inject(TYPES.GlobalEventsManager) eventsManager: EventEmitter,
    @inject(TYPES.DraggableDecorations3dManager) draggableDecorations3dManager: DraggableDecorations3dManagerI,
  ) {
    this.scene = scene;
    this.eventsManager = eventsManager;
    this.targetAreasController = targetAreasController;
    this.draggableDecorationsManager = draggableDecorations3dManager;
  }

  public enableSceneDecoration(): void {
    this.addTargetAreasToScene();
    this.subscribe();
  }

  private subscribe(): void {
    this.eventsManager.on(GameGlobalEvents.decorationButtonClick, this.onDecorationPick, this);
    this.eventsManager.on(GameGlobalEvents.cancelDecorationButtonClick, this.onDecorationCancel, this);
  }

  private onDecorationPick(decorationButtonName: DecorationButtonNames): void {
    switch (decorationButtonName) {
      case DecorationButtonNames.tree:
        this.currentDecoration = this.draggableDecorationsManager.getDraggableDecorationByName(
          DraggableDecorationNames.tree,
        );
        break;
      case DecorationButtonNames.bush:
        this.currentDecoration = this.draggableDecorationsManager.getDraggableDecorationByName(
          DraggableDecorationNames.bush,
        );
        break;
      case DecorationButtonNames.flower:
        this.currentDecoration = this.draggableDecorationsManager.getDraggableDecorationByName(
          DraggableDecorationNames.flower,
        );
        break;
      default:
        throw new Error(`Unknown decoration button Name: ${decorationButtonName}`);
    }

    if (this.currentDecoration) {
      this.scene.addToScene(this.currentDecoration.getDecoration());
      this.draggableObjects.push(this.currentDecoration);
    }
  }

  private onDecorationCancel(): void {
    if (this.currentDecoration) {
      this.scene.removeFromScene(this.currentDecoration);
      this.draggableObjects = this.draggableObjects.filter((obj) => obj !== this.currentDecoration);
      this.currentDecoration = null;
    }
  }

  private addTargetAreasToScene(): void {
    this.targetAreasController.getDecorationTargetAreas().forEach((targetArea) => {
      this.scene.addToScene(targetArea.getDecorationTargetArea());
    });
  }

  private objectPlaced(draggableDecoration: DraggableDecoration3dI): void {
    draggableDecoration.makeUndraggable();
    this.currentDecoration = null;
  }
}
