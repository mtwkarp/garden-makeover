import { injectable } from 'inversify';
import AbstractDecorationButton from '../AbstractDecorationButton';
import PixiSprite from '../../../../../../lib/2d/sprite/PixiSprite';

@injectable()
export default class BushDecorationButton extends AbstractDecorationButton {
  constructor() {
    super();
    this.initialize();
  }

  protected override initialize() {
    this.createChildren();
  }

  protected onClick(): void {}

  protected createButtonBackground(): void {
    const background = new PixiSprite('gameScreen/buttons/simple-button.png');
    background.view.tint = this.tint;

    this.view.addChild(background.view);
  }

  protected createIcon(): void {
    const icon = new PixiSprite('gameScreen/icons/bush.png');
    icon.setScale(0.7, 0.7);

    this.view.addChild(icon.view);
  }
}
