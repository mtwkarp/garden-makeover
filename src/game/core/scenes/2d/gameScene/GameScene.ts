import { inject, injectable } from 'inversify';
import { EventEmitter } from 'pixi.js';
import { ContainerI, Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';
import { TYPES } from '../../../../IoC/Types';
import { DecorationButtonsCollection } from '../../../components/2d/buttons/types/types';
import PixiContainer from '../../../../lib/2d/container/PixiContainer';
import { DecorationButtonNames } from '../../../components/2d/buttons/types/enums';
import { DecorationPickButtonI } from '../../../components/2d/buttons/types/interfaces';
import { GameGlobalEvents } from '../../../events/types/enums';

@injectable()
export default class GameScene extends PixiScene implements Scene2dI {
  private readonly buttons: DecorationButtonsCollection;

  private readonly buttonsArr: DecorationPickButtonI[];

  private buttonsContainer: ContainerI;

  private readonly globalEventsManager: EventEmitter;

  constructor(
  @inject(TYPES.DecorationsPick2dButtonsCollection) decorationPickButtons: DecorationButtonsCollection,
    @inject(TYPES.GlobalEventsManager) globalEventsManager: EventEmitter,
  ) {
    super();
    this.globalEventsManager = globalEventsManager;
    this.buttons = decorationPickButtons;
    this.buttonsArr = Object.keys(this.buttons).map((key) => this.buttons[key as DecorationButtonNames]);
    this.initialize();
  }

  private initialize(): void {
    this.createChildren();
    this.setPositionsForButtons();
    this.subscribe();
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

    this.addChild(this.buttonsContainer.view);
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
    this.globalEventsManager.on(GameGlobalEvents.decorationButtonClick, this.onButtonClick, this);
  }

  private onButtonClick(buttonName: DecorationButtonNames): void {
    if (buttonName === DecorationButtonNames.discard) {
      this.onDiscardButtonClick();
    } else {
      this.onDecorationPickButtonClick();
    }
  }

  private onDiscardButtonClick(): void {
    this.buttons[DecorationButtonNames.discard].hide();
    this.enableDecorationButtons();
  }

  private onDecorationPickButtonClick(): void {
    this.buttons[DecorationButtonNames.discard].show();
    this.disableDecorationButtons();
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
