import { inject, injectable } from 'inversify';
import { EventEmitter } from 'pixi.js';
import { SceneDecorationControllerI } from './types/interfaces';
import { DraggableDecorationNames } from '../decorations/types/enums';
import { TYPES } from '../../../../IoC/Types';
import { MainScene3dI } from '../../../scenes/3d/mainScene3d/types/interfaces';
import { DecorationTargetAreaI, DecorationTargetAreasControllerI } from '../targetArea/types/interfaces';
import { GameGlobalEvents } from '../../../events/types/enums';
import { DecorationButtonNames } from '../../2d/buttons/decoration/types/enums';
import { DraggableDecoration3dI, DraggableDecorations3dManagerI } from '../decorations/types/interfaces';
import { DragControllerI } from '../dragControls/types/interfaces';

@injectable()
export default class SceneDecorationController implements SceneDecorationControllerI {
  private readonly scene: MainScene3dI;

  private readonly targetAreasController: DecorationTargetAreasControllerI;

  private currentDecoration: DraggableDecoration3dI | null = null;

  private readonly draggableDecorationsManager: DraggableDecorations3dManagerI;

  private readonly eventsManager: EventEmitter;

  private readonly dragController: DragControllerI;

  constructor(
  @inject(TYPES.MainScene3d) scene: MainScene3dI,
    @inject(TYPES.DecorationTargetAreasController) targetAreasController: DecorationTargetAreasControllerI,
    @inject(TYPES.GlobalEventsManager) eventsManager: EventEmitter,
    @inject(TYPES.DraggableDecorations3dManager) draggableDecorations3dManager: DraggableDecorations3dManagerI,
    @inject(TYPES.DragController) dragController: DragControllerI,
  ) {
    this.scene = scene;
    this.eventsManager = eventsManager;
    this.targetAreasController = targetAreasController;
    this.draggableDecorationsManager = draggableDecorations3dManager;
    this.dragController = dragController;
  }

  public enableSceneDecoration(): void {
    this.addTargetAreasToScene();
    this.subscribe();
  }

  private subscribe(): void {
    this.eventsManager.on(GameGlobalEvents.decorationButtonClick, this.onDecorationPick, this);
    this.eventsManager.on(GameGlobalEvents.cancelDecorationButtonClick, this.onDecorationCancel, this);
    this.eventsManager.on(GameGlobalEvents.decorationSuccessfullyPlaced, this.onDecorationSuccessfulPlacing, this);
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
      this.scene.addToScene(this.currentDecoration.getDecorationHitArea());
      this.currentDecoration.animatePlacingDecorationOnScene();
      this.dragController.setDraggable(this.currentDecoration);
      this.dragController.setTargetAreas(this.targetAreasController.getDecorationTargetAreas());
      this.targetAreasController.displayTargetAreas();
      this.displayHint();
    }
  }

  private displayHint(): void {
    if (this.targetAreasController.getNumberOfActiveTargetAreas() === 3) {
      this.targetAreasController.displayHint();
    }
  }

  private onDecorationCancel(): void {
    if (this.currentDecoration) {
      this.scene.removeFromScene(this.currentDecoration.getDecoration());
      this.scene.removeFromScene(this.currentDecoration.getDecorationHitArea());
      this.targetAreasController.hideTargetAreas();
      this.targetAreasController.hideHint();
      this.currentDecoration = null;
    }
  }

  private addTargetAreasToScene(): void {
    this.targetAreasController.getDecorationTargetAreas().forEach((targetArea) => {
      this.scene.addToScene(targetArea.getDecorationTargetArea());
    });

    this.targetAreasController.hideTargetAreas();
  }

  private onDecorationSuccessfulPlacing(decorationTargetArea: DecorationTargetAreaI): void {
    this.targetAreasController.hideTargetAreas();
    this.targetAreasController.hideHint();
    decorationTargetArea.disableForever();

    if (this.currentDecoration) {
      this.currentDecoration?.animatePlacingDecorationOnScene();
      this.currentDecoration = null;
    }

    if (this.targetAreasController.getNumberOfActiveTargetAreas() === 0) {
      this.eventsManager.emit(GameGlobalEvents.allDecorationsSuccessfullyPlaced);
    }
  }
}
