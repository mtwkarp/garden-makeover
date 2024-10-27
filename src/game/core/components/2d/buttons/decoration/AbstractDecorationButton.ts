import { inject, injectable } from 'inversify';
import { DecorationPickButtonI } from './types/interfaces';
import PixiContainer from '../../../../../lib/2d/container/PixiContainer';
import { TYPES } from '../../../../../IoC/Types';
import { DecorationButtonNames } from './types/enums';
import AbstractButton from '../AbstractButton';
import PixiSprite from '../../../../../lib/2d/sprite/PixiSprite';
import { MultipleValuesObservableI } from '../../../../../lib/observable/types/interfaces';
import { DecorationButtonsInteractionEvents } from '../../../../observables/types/enums';

@injectable()
export default abstract class AbstractDecorationButton extends AbstractButton implements DecorationPickButtonI {
  protected disabledForever: boolean = false;

  public abstract readonly decorationName: DecorationButtonNames;

  @inject(TYPES.DecorationButtonsInteractionObservable)
  protected readonly interactionObservable: MultipleValuesObservableI<
  DecorationButtonsInteractionEvents,
  DecorationButtonNames
  >;

  constructor() {
    super();
    this.makeInteractive();
    this.enableButtonMode();
    this.spritesContainer = new PixiContainer();
    this.addChild(this.spritesContainer.view);
  }

  protected subscribe(): void {
    this.onPointerDown(this.onClick.bind(this));
  }

  protected onClick(): void {
    this.animateClick();
    this.triggerClickEvent();
  }

  protected abstract createIcon(): void;
  protected abstract initialize(): void;

  protected createChildren(): void {
    this.createButtonBackground();
    this.createIcon();
  }

  protected createButtonBackground(): void {
    this.background = new PixiSprite('gameScreen/buttons/simple-button.png');
    this.background.setTint(this.buttonBackgroundTint);
    this.background.enableButtonMode();

    this.spritesContainer.addChild(this.background.view);
  }

  protected triggerClickEvent(): void {
    this.interactionObservable.notify(DecorationButtonsInteractionEvents.decorationButtonClick, this.decorationName);
  }

  public disableForever(): void {
    this.disable();
    this.disabledForever = true;
  }

  public disable(): void {
    this.makeNoninteractive();
    this.disableButtonMode();
    this.setTint(0xa9a9a9);
  }

  public enable(): void {
    if (this.disabledForever) {
      return;
    }

    this.makeInteractive();
    this.enableButtonMode();
    this.setTint(16777215);
  }
}
