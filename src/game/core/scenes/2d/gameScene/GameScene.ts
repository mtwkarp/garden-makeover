import { inject, injectable } from 'inversify';
import { EventEmitter } from 'pixi.js';
import { ContainerI, Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';
import { TYPES } from '../../../../IoC/Types';
import { DecorationButtonsCollection } from '../../../components/2d/buttons/decoration/types/types';
import PixiContainer from '../../../../lib/2d/container/PixiContainer';
import { DecorationButtonNames } from '../../../components/2d/buttons/decoration/types/enums';
import { DecorationPickButtonI } from '../../../components/2d/buttons/decoration/types/interfaces';
import { GameGlobalEvents } from '../../../events/types/enums';

@injectable()
export default class GameScene extends PixiScene implements Scene2dI {
  private readonly buttons: DecorationButtonsCollection;

  private readonly buttonsArr: DecorationPickButtonI[];

  private buttonsContainer: ContainerI;

  private lastClickedButtonName: DecorationButtonNames | null;

  private readonly globalEventsManager: EventEmitter;

  private readonly changeLightButton: ContainerI;

  private hintArrow: ContainerI | null;

  constructor(
  @inject(TYPES.DecorationsPick2dButtonsCollection) decorationPickButtons: DecorationButtonsCollection,
    @inject(TYPES.GlobalEventsManager) globalEventsManager: EventEmitter,
    @inject(TYPES.ChangeLightButton) changeLightButton: ContainerI,
    @inject(TYPES.HintArrow2d) hintArrow: ContainerI,
  ) {
    super();
    this.globalEventsManager = globalEventsManager;
    this.buttons = decorationPickButtons;
    this.buttonsArr = Object.keys(this.buttons).map((key) => this.buttons[key as DecorationButtonNames]);
    this.changeLightButton = changeLightButton;
    this.hintArrow = hintArrow;
    this.initialize();
  }

  private initialize(): void {
    this.createChildren();
    this.setPositionsForButtons();
    this.subscribe();
    this.displayHint();
  }

  private displayHint(): void {
    if (this.hintArrow !== null) {
      const bushButtonPosition = this.buttons[DecorationButtonNames.bush].position;
      this.hintArrow.setPosition(bushButtonPosition.x - 90, bushButtonPosition.y);
      this.buttonsContainer.addChild(this.hintArrow.view);
    }
  }

  private createChildren(): void {
    this.buttonsContainer = new PixiContainer();
    this.buttonsContainer.setPosition(window.innerWidth / 2 - 80, window.innerHeight / 2 - 370);

    this.buttonsContainer.addChild(
      this.buttons[DecorationButtonNames.discard].view,
      this.buttons[DecorationButtonNames.flower].view,
      this.buttons[DecorationButtonNames.bush].view,
      this.buttons[DecorationButtonNames.tree].view,
    );

    this.changeLightButton.setScale(0.35, 0.35);
    this.changeLightButton.setPosition(-window.innerWidth / 2 + 80, -window.innerHeight / 2 + 80);

    this.addChild(this.buttonsContainer.view, this.changeLightButton.view);
  }

  private setPositionsForButtons(): void {
    for (let i = 0; i < this.buttonsArr.length; i++) {
      const button = this.buttonsArr[i];

      button.setPositionY((i + 1) * 100);
      button.setScale(0.35, 0.35);
    }

    this.buttons[DecorationButtonNames.discard].setPositionY(0);
  }

  private subscribe(): void {
    this.globalEventsManager.on(GameGlobalEvents.decorationButtonClick, this.onDecorationPickButtonClick, this);
    this.globalEventsManager.on(GameGlobalEvents.cancelDecorationButtonClick, this.onDiscardButtonClick, this);
    this.globalEventsManager.on(GameGlobalEvents.decorationSuccessfullyPlaced, this.onSuccessfulDecorationPlacing, this);
  }

  private onSuccessfulDecorationPlacing(): void {
    if (this.lastClickedButtonName) {
      this.buttons[this.lastClickedButtonName].disableForever();
    }

    this.buttons[DecorationButtonNames.discard].hide();
    this.enableDecorationButtons();
  }

  private removeHint(): void {
    if (this.hintArrow !== null) {
      this.hintArrow.destroy();
      this.hintArrow = null;
    }
  }

  private onDecorationPickButtonClick(name: DecorationButtonNames): void {
    this.removeHint();
    this.buttons[DecorationButtonNames.discard].show();
    this.disableDecorationButtons();
    this.lastClickedButtonName = name;
  }

  private onDiscardButtonClick(): void {
    this.buttons[DecorationButtonNames.discard].hide();
    this.enableDecorationButtons();
  }

  private disableDecorationButtons(): void {
    this.decorationPickButtons.forEach((button) => {
      button.disable();
    });
  }

  private enableDecorationButtons(): void {
    this.decorationPickButtons.forEach((button) => {
      button.enable();
    });
  }

  private get decorationPickButtons(): DecorationPickButtonI[] {
    return this.buttonsArr.filter((button) => button.decorationName !== DecorationButtonNames.discard);
  }

  public get sceneName(): string {
    return SceneNames2d.game;
  }
}
