import { inject, injectable } from 'inversify';
import gsap from 'gsap';
import { EventEmitter } from 'pixi.js';
import { DecorationPickButtonI } from './types/interfaces';
import PixiContainer from '../../../../../lib/2d/container/PixiContainer';
import { ContainerI } from '../../../../../lib/2d/types/interfaces';
import { TYPES } from '../../../../../IoC/Types';
import { DecorationButtonNames } from './types/enums';
import { GameGlobalEvents } from '../../../../events/types/enums';

@injectable()
export default abstract class AbstractDecorationButton extends PixiContainer implements DecorationPickButtonI {
  protected buttonBackgroundTint: number = 0xecffdc;

  protected spritesContainer: ContainerI;

  protected clickAnimationFinished: boolean = true;

  protected readonly globalEventsManager: EventEmitter;

  public abstract readonly decorationName: DecorationButtonNames;

  constructor(@inject(TYPES.GlobalEventsManager) globalEventsManager: EventEmitter) {
    super();
    this.globalEventsManager = globalEventsManager;
    this.makeInteractive();
    this.enableButtonMode();
    this.spritesContainer = new PixiContainer();
    this.addChild(this.spritesContainer.view);
  }

  protected subscribe(): void {
    this.onPointerDown(this.onClick.bind(this));
  }

  protected onClick(): void {
    this.animateClick();
    this.triggerClickEvent();
  }

  protected abstract createButtonBackground(): void;
  protected abstract createIcon(): void;
  protected abstract initialize(): void;

  protected createChildren(): void {
    this.createButtonBackground();
    this.createIcon();
  }

  protected triggerClickEvent(): void {
    this.globalEventsManager.emit(GameGlobalEvents.decorationButtonClick, this.decorationName);
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

  public disable(): void {
    this.makeNoninteractive();
    this.disableButtonMode();
    this.view.tint = 0xa9a9a9;
  }

  public enable(): void {
    this.makeInteractive();
    this.enableButtonMode();
    this.view.tint = 16777215;
  }
}
