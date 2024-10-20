import { injectable } from 'inversify';
import { DecorationPickButtonI } from './types/interfaces';
import PixiContainer from '../../../../../lib/2d/container/PixiContainer';

@injectable()
export default abstract class AbstractDecorationButton extends PixiContainer implements DecorationPickButtonI {
  protected tint: number = 0xecffdc;

  protected abstract onClick(): void;
  protected abstract createButtonBackground(): void;
  protected abstract createIcon(): void;
  protected abstract initialize(): void;
  protected createChildren(): void {
    this.createButtonBackground();
    this.createIcon();
  }
}
