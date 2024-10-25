import { inject, injectable } from 'inversify';
import { EventEmitter } from 'pixi.js';
import PixiContainer from '../../../../../lib/2d/container/PixiContainer';
import { TYPES } from '../../../../../IoC/Types';
import { DecorationButtonsCollection } from './types/types';
import { ContainerI } from '../../../../../lib/2d/types/interfaces';
import { DecorationButtonNames } from './types/enums';
import { DecorationButtonsManagerI, DecorationPickButtonI } from './types/interfaces';
import { GameGlobalEvents } from '../../../../events/types/enums';
import { UIThemeModeServiceI } from '../../../../lightModes/types/interfaces';

@injectable()
export class DecorationButtonsManager implements DecorationButtonsManagerI {
  private readonly buttons: DecorationButtonsCollection;

  private readonly buttonsArr: DecorationPickButtonI[];

  private container: ContainerI;

  private lastClickedButtonName: DecorationButtonNames | null;

  private readonly globalEventsManager: EventEmitter;

  private hintArrow: ContainerI | null;

  private readonly themeModeService: UIThemeModeServiceI;

  constructor(
  @inject(TYPES.DecorationsPick2dButtonsCollection) decorationPickButtons: DecorationButtonsCollection,
    @inject(TYPES.GlobalEventsManager) globalEventsManager: EventEmitter,
    @inject(TYPES.HintArrow2d) hintArrow: ContainerI,
    @inject(TYPES.UIThemeModeService) themeModeService: UIThemeModeServiceI,
  ) {
    this.themeModeService = themeModeService;
    this.globalEventsManager = globalEventsManager;
    this.buttons = decorationPickButtons;
    this.buttonsArr = Object.keys(this.buttons).map((key) => this.buttons[key as DecorationButtonNames]);
    this.hintArrow = hintArrow;

    this.initialize();
  }

  private initialize(): void {
    this.createChildren();
    this.setPositionsForButtons();
    this.registerButtonsOnThemeModeChange();
    this.subscribe();
    this.displayHint();
  }

  private registerButtonsOnThemeModeChange(): void {
    this.buttonsArr.forEach((btn) => {
      this.themeModeService.registerUIElement(btn);
    });
  }

  private setPositionsForButtons(): void {
    for (let i = 0; i < this.buttonsArr.length; i++) {
      const button = this.buttonsArr[i];

      button.setPositionY((i + 1) * 100);
      button.setScale(0.35, 0.35);
    }

    this.buttons[DecorationButtonNames.discard].setPositionY(0);
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

  private get decorationPickButtons(): DecorationPickButtonI[] {
    return this.buttonsArr.filter((button) => button.decorationName !== DecorationButtonNames.discard);
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

  private createChildren(): void {
    this.container = new PixiContainer();

    this.container.addChild(
      this.buttons[DecorationButtonNames.discard].view,
      this.buttons[DecorationButtonNames.flower].view,
      this.buttons[DecorationButtonNames.bush].view,
      this.buttons[DecorationButtonNames.tree].view,
    );
  }

  private removeHint(): void {
    if (this.hintArrow !== null) {
      this.hintArrow.destroy();
      this.hintArrow = null;
    }
  }

  private displayHint(): void {
    if (this.hintArrow !== null) {
      const bushButtonPosition = this.buttons[DecorationButtonNames.bush].position;
      this.hintArrow.setPosition(bushButtonPosition.x - 90, bushButtonPosition.y);
      this.container.addChild(this.hintArrow.view);
    }
  }

  public getButtonsView(): ContainerI {
    if (!this.container) {
      throw new Error('Initialize decoration buttons manager first.');
    }

    return this.container;
  }
}
