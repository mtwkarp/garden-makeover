import { inject, injectable } from 'inversify';
import gsap from 'gsap';
import { EventEmitter } from 'pixi.js';
import PixiContainer from '../../../../../lib/2d/container/PixiContainer';
import { ContainerI } from '../../../../../lib/2d/types/interfaces';
import { TYPES } from '../../../../../IoC/Types';
import { GameGlobalEvents } from '../../../../events/types/enums';
import PixiSprite from '../../../../../lib/2d/sprite/PixiSprite';

@injectable()
export default class LightChangeButton extends PixiContainer {
  protected spritesContainer: ContainerI;

  protected clickAnimationFinished: boolean = true;

  protected readonly globalEventsManager: EventEmitter;

  constructor(@inject(TYPES.GlobalEventsManager) globalEventsManager: EventEmitter) {
    super();
    this.globalEventsManager = globalEventsManager;
    this.makeInteractive();
    this.enableButtonMode();
    this.spritesContainer = new PixiContainer();
    this.addChild(this.spritesContainer.view);

    this.initialize();
  }

  protected subscribe(): void {
    this.onPointerDown(this.onClick.bind(this));
  }

  protected onClick(): void {
    this.animateClick();
    this.triggerClickEvent();
  }

  protected createButtonBackground(): void {
    const background = new PixiSprite('gameScreen/buttons/simple-button.png');
    background.view.cursor = 'pointer';

    this.spritesContainer.addChild(background.view);
  }

  protected createIcon(): void {
    const icon = new PixiSprite('gameScreen/icons/light_bulb.png');
    icon.setScale(0.7, 0.7);
    icon.view.cursor = 'pointer';

    this.spritesContainer.addChild(icon.view);
  }

  protected initialize(): void {
    this.createButtonBackground();
    this.createIcon();
    this.subscribe();
  }

  protected createChildren(): void {
    this.createButtonBackground();
    this.createIcon();
  }

  protected triggerClickEvent(): void {
    this.globalEventsManager.emit(GameGlobalEvents.changeLightningButtonClick);
  }

  protected animateClick(): void {
    if (!this.clickAnimationFinished) {
      return;
    }

    this.clickAnimationFinished = false;
    gsap.to(this.spritesContainer.view.scale, {
      duration: 0.15,
      x: 0.85,
      y: 0.85,
      ease: 'power1.out',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.clickAnimationFinished = true;
      },
    });
  }
}
