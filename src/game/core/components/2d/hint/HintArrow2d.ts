import { injectable } from 'inversify';
import gsap from 'gsap';
import { ContainerI, SpriteI } from '../../../../lib/2d/types/interfaces';
import PixiContainer from '../../../../lib/2d/container/PixiContainer';
import PixiSprite from '../../../../lib/2d/sprite/PixiSprite';

@injectable()
export default class HintArrow2d extends PixiContainer implements ContainerI {
  private arrowSprite: SpriteI;

  private animation: gsap.core.Tween;

  constructor() {
    super();

    this.initialize();
  }

  private initialize(): void {
    this.createChildren();
    this.animate();
  }

  private createChildren(): void {
    this.arrowSprite = new PixiSprite('hint/green-arrow.png');
    this.arrowSprite.setRotation(Math.PI);
    this.arrowSprite.setScale(0.13, 0.13);

    this.addChild(this.arrowSprite.view);
  }

  private animate(): void {
    this.animation = gsap.to(this.arrowSprite.position, {
      duration: 0.7,
      x: -50,
      yoyo: true,
      ease: 'power1.inOut',
      repeat: -1,
    });
  }

  public override destroy(): void {
    this.animation.kill();
    super.destroy();
  }
}
