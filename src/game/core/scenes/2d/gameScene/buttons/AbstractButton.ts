import { injectable } from 'inversify';
import { ButtonI } from './types/interfaces';
import PixiSprite from '../../../../../lib/2d/sprite/PixiSprite';

@injectable()
export default abstract class AbstractButton extends PixiSprite implements ButtonI {
  protected abstract onClick(): void;
  protected abstract createButtonBackground(): void;
  protected abstract createIcon(): void;
}
