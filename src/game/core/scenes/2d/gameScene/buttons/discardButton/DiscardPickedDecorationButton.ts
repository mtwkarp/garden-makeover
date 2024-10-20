import { injectable } from 'inversify';
import { DecorationPickButtonI } from '../types/interfaces';
import AbstractDecorationButton from '../AbstractDecorationButton';
import PixiSprite from '../../../../../../lib/2d/sprite/PixiSprite';

@injectable()
export default class DiscardPickedDecorationButton extends AbstractDecorationButton implements DecorationPickButtonI {
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

    this.view.addChild(background.view);
  }

  protected createIcon(): void {
    const icon = new PixiSprite('gameScreen/icons/discard.png');
    icon.setScale(0.5, 0.5);

    this.view.addChild(icon.view);
  }
}
