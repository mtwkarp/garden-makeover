import { injectable } from 'inversify';
import gsap from 'gsap';
import { ContainerI, SpriteI } from '../../../../../lib/2d/types/interfaces';
import PixiContainer from '../../../../../lib/2d/container/PixiContainer';
import PixiSprite from '../../../../../lib/2d/sprite/PixiSprite';
import AbstractHint from '../AbstractHint';
import { HintIds } from '../types/types';
import { HintIds2d } from '../types/enums';
import { Hint2dI } from '../types/interfaces';

@injectable()
export default class HintArrow2d extends AbstractHint implements Hint2dI {
  private arrowSprite: SpriteI;

  private container: ContainerI | null;

  public readonly id: HintIds = HintIds2d.decorationPickHintArrow;

  public initialize(): void {
    this.createChildren();
    this.animate();
    this.hide();
  }

  private createChildren(): void {
    this.container = new PixiContainer();

    this.arrowSprite = new PixiSprite('hint/green-arrow.png');
    this.arrowSprite.setRotation(Math.PI);
    this.arrowSprite.setScale(0.13, 0.13);

    this.container.addChild(this.arrowSprite.view);
  }

  private animate(): void {
    gsap.to(this.arrowSprite.position, {
      duration: 0.7,
      x: -50,
      yoyo: true,
      ease: 'power1.inOut',
      repeat: -1,
    });
  }

  public get view(): any {
    if (!this.container) {
      throw new Error(`Initialize hint first! Hint id - ${this.id}`);
    }

    return this.container.view;
  }

  public display(): void {
    if (!this.container) {
      return;
    }

    this.container.visible = true;
  }

  public hide(): void {
    if (!this.container) {
      return;
    }

    this.container.visible = false;
  }

  public setPosition(position: { x: number; y: number }): void {
    if (!this.container) {
      return;
    }

    this.container.setPosition(position.x, position.y);
  }
}
