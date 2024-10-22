import { inject, injectable } from 'inversify';
import { EventEmitter } from 'pixi.js';
import AbstractDecorationButton from '../AbstractDecorationButton';
import PixiSprite from '../../../../../../lib/2d/sprite/PixiSprite';
import { DecorationButtonNames } from '../types/enums';
import { TYPES } from '../../../../../../IoC/Types';

@injectable()
export default class FlowerDecorationButton extends AbstractDecorationButton {
  public readonly decorationName: DecorationButtonNames = DecorationButtonNames.flower;

  constructor(@inject(TYPES.GlobalEventsManager) globalEventsManager: EventEmitter) {
    super(globalEventsManager);
    this.initialize();
  }

  protected override initialize(): void {
    this.createChildren();
    this.subscribe();
  }

  protected createButtonBackground(): void {
    const background = new PixiSprite('gameScreen/buttons/simple-button.png');
    background.view.tint = this.buttonBackgroundTint;
    background.view.cursor = 'pointer';

    this.spritesContainer.addChild(background.view);
  }

  protected createIcon(): void {
    const icon = new PixiSprite('gameScreen/icons/flower.png');
    icon.setScale(0.45, 0.45);
    icon.view.cursor = 'pointer';

    this.spritesContainer.addChild(icon.view);
  }
}
