import { inject, injectable } from 'inversify';
import { EventEmitter } from 'pixi.js';
import AbstractDecorationButton from '../AbstractDecorationButton';
import PixiSprite from '../../../../../../lib/2d/sprite/PixiSprite';
import { DecorationButtonNames } from '../types/enums';
import { TYPES } from '../../../../../../IoC/Types';

@injectable()
export default class TreeDecorationButton extends AbstractDecorationButton {
  public readonly decorationName: DecorationButtonNames = DecorationButtonNames.tree;

  constructor(@inject(TYPES.GlobalEventsManager) globalEventsManager: EventEmitter) {
    super(globalEventsManager);
    this.initialize();
  }

  protected override initialize(): void {
    this.createChildren();
    this.subscribe();
  }

  protected createIcon(): void {
    const icon = new PixiSprite('gameScreen/icons/tree.png');
    icon.setScale(0.6, 0.6);
    icon.setTint(this.buttonBackgroundTint);
    icon.enableButtonMode();

    this.spritesContainer.addChild(icon.view);
  }
}
