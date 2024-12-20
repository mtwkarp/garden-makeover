import { injectable } from 'inversify';
import AbstractDecorationButton from '../AbstractDecorationButton';
import PixiSprite from '../../../../../../lib/2d/sprite/PixiSprite';
import { DecorationButtonNames } from '../types/enums';

@injectable()
export default class FlowerDecorationButton extends AbstractDecorationButton {
  public readonly decorationName: DecorationButtonNames = DecorationButtonNames.flower;

  constructor() {
    super();
    this.initialize();
  }

  protected override initialize(): void {
    this.createChildren();
    this.subscribe();
  }

  protected createIcon(): void {
    const icon = new PixiSprite('gameScreen/icons/flower.png');
    icon.setScale(0.45, 0.45);
    icon.enableButtonMode();

    this.spritesContainer.addChild(icon.view);
  }
}
