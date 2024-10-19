import { DiscardButtonI } from '../types/interfaces';
import AbstractButton from '../AbstractButton';

export default class DiscardPickedDecorationButton extends AbstractButton implements DiscardButtonI {
  protected onClick(): void {}

  protected createButtonBackground(): void {
    // const background = new PixiSprite('')
  }

  protected createIcon(): void {}
}
