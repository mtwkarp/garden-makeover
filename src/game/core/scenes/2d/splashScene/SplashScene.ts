import gsap from 'gsap';
import { Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';
import PixiSprite from '../../../../lib/2d/sprite/PixiSprite';

export default class SplashScene extends PixiScene implements Scene2dI {
  private readonly animations: gsap.core.Tween[] = [];

  constructor() {
    super();

    this.initialize();
  }

  public get sceneName(): string {
    return SceneNames2d.splash;
  }

  private initialize(): void {
    this.hide();
    this.createChildren();
  }

  private createBackground(): void {
    const background = new PixiSprite('splashScreen/background.jpg');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scale = Math.max(screenWidth / background.width, screenHeight / background.height);

    background.setScale(scale, scale);

    this.addChild(background.view);
  }

  private createLoader(): void {
    const loader = new PixiSprite('splashScreen/rotate.png');
    loader.setPositionY(-100);
    loader.setScale(0.3, 0.3);

    const rotationAnimation = gsap.to(loader.view, {
      rotation: 360 * (Math.PI / 180), // convert to radians
      duration: 2,
      ease: 'none',
      repeat: -1,
    });

    this.animations.push(rotationAnimation);
    this.addChild(loader.view);
  }

  public override destroy(): void {
    const fadeAnimation = gsap.to(this.view, {
      alpha: 0, // convert to radians
      duration: 2,
      onComplete: () => {
        this.animations.push(fadeAnimation);
        this.destroyAllAnimations();
        super.destroy();
      },
    });
  }

  private destroyAllAnimations(): void {
    this.animations.forEach((animation) => {
      animation.kill();
    });
  }

  private createChildren(): void {
    this.createBackground();
    this.createLoader();
  }
}
