import { injectable } from 'inversify';
import AbstractDecorationButton from '../AbstractDecorationButton';
import PixiSprite from '../../../../../../lib/2d/sprite/PixiSprite';
import { DecorationButtonNames } from '../types/enums';

@injectable()
export default class TreeDecorationButton extends AbstractDecorationButton {
  public readonly decorationName: DecorationButtonNames = DecorationButtonNames.tree;

  constructor() {
    super();
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
