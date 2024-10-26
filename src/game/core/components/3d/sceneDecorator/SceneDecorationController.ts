import { inject, injectable } from 'inversify';
import { SceneDecorationControllerI } from './types/interfaces';
import { DraggableDecorationNames } from '../decorations/types/enums';
import { TYPES } from '../../../../IoC/Types';
import { MainScene3dI } from '../../../scenes/3d/mainScene3d/types/interfaces';
import { DecorationTargetAreasControllerI } from '../targetArea/types/interfaces';
import { DecorationButtonNames } from '../../2d/buttons/decoration/types/enums';
import { DraggableDecoration3dI, DraggableDecorations3dManagerI } from '../decorations/types/interfaces';
import { DragControllerI } from '../dragControls/types/interfaces';
import { MultipleValuesObservableI } from '../../../../lib/observable/types/interfaces';
import { DecorationButtonsInteractionEvents, GameProcessEvents } from '../../../observables/types/enums';
import { HintsManagerI } from '../../2d/hint/types/interfaces';
import { HintIds3d } from '../../2d/hint/types/enums';

@injectable()
export default class SceneDecorationController implements SceneDecorationControllerI {
  private readonly scene: MainScene3dI;

  private readonly targetAreasController: DecorationTargetAreasControllerI;

  private currentDecoration: DraggableDecoration3dI | null = null;

  private readonly draggableDecorationsManager: DraggableDecorations3dManagerI;

  private readonly dragController: DragControllerI;

  private readonly decorationButtonsInteractionObservable: MultipleValuesObservableI<
  DecorationButtonsInteractionEvents,
  DecorationButtonNames
  >;

  private readonly gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>;

  private readonly hintsManager: HintsManagerI;

  constructor(
  @inject(TYPES.MainScene3d) scene: MainScene3dI,
    @inject(TYPES.DecorationTargetAreasController) targetAreasController: DecorationTargetAreasControllerI,
    @inject(TYPES.DraggableDecorations3dManager) draggableDecorations3dManager: DraggableDecorations3dManagerI,
    @inject(TYPES.DragController) dragController: DragControllerI,
    @inject(TYPES.DecorationButtonsInteractionObservable)
    decorationButtonsInteractionObservable: MultipleValuesObservableI<
    DecorationButtonsInteractionEvents,
    DecorationButtonNames
    >,
    @inject(TYPES.GameProcessObservable) gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>,
    @inject(TYPES.HintsManager) hintsManager: HintsManagerI,
  ) {
    this.decorationButtonsInteractionObservable = decorationButtonsInteractionObservable;
    this.scene = scene;
    this.gameProcessObservable = gameProcessObservable;
    this.targetAreasController = targetAreasController;
    this.draggableDecorationsManager = draggableDecorations3dManager;
    this.dragController = dragController;
    this.hintsManager = hintsManager;
  }

  public enableSceneDecoration(): void {
    this.addTargetAreasToScene();
    this.subscribe();
  }

  private subscribe(): void {
    this.decorationButtonsInteractionObservable.subscribe(
      DecorationButtonsInteractionEvents.decorationButtonClick,
      this.onDecorationPick,
      this,
    );

    this.decorationButtonsInteractionObservable.subscribe(
      DecorationButtonsInteractionEvents.cancelDecorationButtonClick,
      this.onDecorationCancel,
      this,
    );

    this.gameProcessObservable.subscribe(
      GameProcessEvents.decorationSuccessfullyPlaced,
      this.onDecorationSuccessfulPlacing,
      this,
    );
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
    const hintedTargetAreaPosition = this.targetAreasController.getDecorationTargetAreas()[1].position;
    const hintPosition = {
      x: hintedTargetAreaPosition.x,
      y: hintedTargetAreaPosition.y + 0.5,
      z: hintedTargetAreaPosition.z,
    };
    this.hintsManager.add3DHint(HintIds3d.decorationTargetAreaHintArrow, this.scene, hintPosition);
    this.hintsManager.displayHint(HintIds3d.decorationTargetAreaHintArrow);
  }

  private onDecorationCancel(): void {
    if (this.currentDecoration) {
      this.scene.removeFromScene(this.currentDecoration.getDecoration());
      this.scene.removeFromScene(this.currentDecoration.getDecorationHitArea());
      this.targetAreasController.hideTargetAreas();
      this.hintsManager.hideHintAsNotCompleted(HintIds3d.decorationTargetAreaHintArrow);
      this.currentDecoration = null;
    }
  }

  private addTargetAreasToScene(): void {
    this.targetAreasController.getDecorationTargetAreas().forEach((targetArea) => {
      this.scene.addToScene(targetArea.getDecorationTargetArea());
    });

    this.targetAreasController.hideTargetAreas();
  }

  private onDecorationSuccessfulPlacing(): void {
    this.targetAreasController.hideTargetAreas();
    this.hintsManager.hideHintAsCompleted(HintIds3d.decorationTargetAreaHintArrow);
    this.dragController.lastPlacedTargetArea.disableForever();

    if (this.currentDecoration) {
      this.currentDecoration?.animatePlacingDecorationOnScene();
      this.currentDecoration = null;
    }

    if (this.targetAreasController.getNumberOfActiveTargetAreas() === 0) {
      this.gameProcessObservable.notify(GameProcessEvents.allDecorationsSuccessfullyPlaced, null);
    }
  }
}
