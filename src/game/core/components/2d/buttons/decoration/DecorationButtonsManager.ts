import { inject, injectable } from 'inversify';
import PixiContainer from '../../../../../lib/2d/container/PixiContainer';
import { TYPES } from '../../../../../IoC/Types';
import { DecorationButtonsCollection } from './types/types';
import { ContainerI } from '../../../../../lib/2d/types/interfaces';
import { DecorationButtonNames } from './types/enums';
import { DecorationButtonsManagerI, DecorationPickButtonI } from './types/interfaces';
import { UIThemeModeServiceI } from '../../../../lightModes/types/interfaces';
import { MultipleValuesObservableI } from '../../../../../lib/observable/types/interfaces';
import { DecorationButtonsInteractionEvents, GameProcessEvents } from '../../../../observables/types/enums';
import { HintsManagerI } from '../../hint/types/interfaces';
import { HintIds2d } from '../../hint/types/enums';

@injectable()
export class DecorationButtonsManager implements DecorationButtonsManagerI {
  private readonly buttons: DecorationButtonsCollection;

  private readonly buttonsArr: DecorationPickButtonI[];

  private container: ContainerI;

  private lastClickedButtonName: DecorationButtonNames | null;

  private readonly themeModeService: UIThemeModeServiceI;

  private readonly gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>;

  private readonly decorationButtonsInteractionObservable: MultipleValuesObservableI<
  DecorationButtonsInteractionEvents,
  DecorationButtonNames
  >;

  private readonly hintsManager: HintsManagerI;

  constructor(
  @inject(TYPES.DecorationsPick2dButtonsCollection) decorationPickButtons: DecorationButtonsCollection,
    @inject(TYPES.HintsManager) hintsManager: HintsManagerI,
    @inject(TYPES.UIThemeModeService) themeModeService: UIThemeModeServiceI,
    @inject(TYPES.GameProcessObservable) gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>,
    @inject(TYPES.DecorationButtonsInteractionObservable)
    decorationButtonsInteractionObservable: MultipleValuesObservableI<
    DecorationButtonsInteractionEvents,
    DecorationButtonNames
    >,
  ) {
    this.gameProcessObservable = gameProcessObservable;
    this.decorationButtonsInteractionObservable = decorationButtonsInteractionObservable;
    this.themeModeService = themeModeService;
    this.buttons = decorationPickButtons;
    this.buttonsArr = Object.keys(this.buttons).map((key) => this.buttons[key as DecorationButtonNames]);
    this.hintsManager = hintsManager;

    this.initialize();
  }

  private initialize(): void {
    this.setPositionsForButtons();
    this.createChildren();
    this.registerButtonsOnThemeModeChange();
    this.subscribe();
    this.hintsManager.displayHint(HintIds2d.decorationPickHintArrow);
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
    this.hintsManager.hideHintAsCompleted(HintIds2d.decorationPickHintArrow);
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
    this.decorationButtonsInteractionObservable.subscribe(
      DecorationButtonsInteractionEvents.decorationButtonClick,
      this.onDecorationPickButtonClick,
      this,
    );

    this.decorationButtonsInteractionObservable.subscribe(
      DecorationButtonsInteractionEvents.cancelDecorationButtonClick,
      this.onDiscardButtonClick,
      this,
    );

    this.gameProcessObservable.subscribe(
      GameProcessEvents.decorationSuccessfullyPlaced,
      this.onSuccessfulDecorationPlacing,
      this,
    );
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

    const hintPosition = {
      x: this.buttons[DecorationButtonNames.bush].position.x - 90,
      y: this.buttons[DecorationButtonNames.bush].position.y,
    };
    this.hintsManager.add2DHint(HintIds2d.decorationPickHintArrow, this.container, hintPosition);

    this.container.addChild(
      this.buttons[DecorationButtonNames.discard].view,
      this.buttons[DecorationButtonNames.flower].view,
      this.buttons[DecorationButtonNames.bush].view,
      this.buttons[DecorationButtonNames.tree].view,
    );
  }

  public getButtonsView(): ContainerI {
    if (!this.container) {
      throw new Error('Initialize decoration buttons manager first.');
    }

    return this.container;
  }
}
