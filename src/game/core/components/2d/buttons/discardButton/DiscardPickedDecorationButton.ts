import { inject, injectable } from 'inversify';
import { EventEmitter } from 'pixi.js';
import gsap from 'gsap';
import { DecorationPickButtonI } from '../types/interfaces';
import AbstractDecorationButton from '../AbstractDecorationButton';
import PixiSprite from '../../../../../lib/2d/sprite/PixiSprite';
import { DecorationButtonNames } from '../types/enums';
import { TYPES } from '../../../../../IoC/Types';

@injectable()
export default class DiscardPickedDecorationButton extends AbstractDecorationButton implements DecorationPickButtonI {
  public readonly decorationName: DecorationButtonNames = DecorationButtonNames.discard;

  constructor(@inject(TYPES.GlobalEventsManager) globalEventsManager: EventEmitter) {
    super(globalEventsManager);

    this.initialize();
  }

  protected override initialize(): void {
    super.hide();
    this.spritesContainer.setScale(0, 0);
    this.createChildren();
    this.subscribe();
  }

  public override hide(): void {
    this.makeNoninteractive();
    super.hide();
    this.spritesContainer.setScale(0, 0);
  }

  public override show(): void {
    super.show();

    gsap.to(this.spritesContainer.scale, {
      duration: 0.5,
      x: 1,
      y: 1,
      ease: 'elastic.out(1, 0.5)',
      onComplete: () => {
        this.makeInteractive();
      },
    });
  }

  protected createButtonBackground(): void {
    const background = new PixiSprite('gameScreen/buttons/simple-button.png');
    background.enableButtonMode();

    this.spritesContainer.view.addChild(background.view);
  }

  protected createIcon(): void {
    const icon = new PixiSprite('gameScreen/icons/discard.png');
    icon.enableButtonMode();
    icon.setScale(0.5, 0.5);

    this.spritesContainer.addChild(icon.view);
  }
}
