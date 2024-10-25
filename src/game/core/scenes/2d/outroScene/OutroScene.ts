import { injectable } from 'inversify';
import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import { Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';
import PixiSprite from '../../../../lib/2d/sprite/PixiSprite';

@injectable()
export default class OutroScene extends PixiScene implements Scene2dI {
  constructor() {
    super();

    this.initialize();
  }

  public override show(): void {
    super.show();
    this.animateSceneAppearance();
  }

  private animateSceneAppearance(): void {
    this.alpha = 0;

    gsap.to(this.view, {
      alpha: 1,
      duration: 2,
    });
  }

  public get sceneName(): string {
    return SceneNames2d.outro;
  }

  private initialize(): void {
    this.hide();
    this.createChildren();
  }

  private createChildren(): void {
    this.createBackground();
    this.createGameLogo();
    this.createDownloadButton();
  }

  private createGameLogo(): void {
    const logo = new PixiSprite('outroScreen/game-icon.png');
    logo.setScale(0.2, 0.2);
    logo.setPositionY(-100);

    this.addChild(logo.view);
  }

  private createBackground(): void {
    const graphic = new PIXI.Graphics();

    graphic.rect(0, 0, window.innerWidth + 20, window.innerHeight);
    graphic.fill(0x000000);
    graphic.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
    graphic.alpha = 0.5;

    this.addChild(graphic);
  }

  private createDownloadButton(): void {
    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 96,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: '#ffffff',
      dropShadow: {
        color: '#000000',
        blur: 4,
        angle: Math.PI / 6,
        distance: 6,
      },
    });
    const text = new PIXI.Text({ text: 'DOWNLOAD', style: textStyle });
    text.anchor.set(0.5);

    const button = new PixiSprite('outroScreen/download-button.png');
    button.setScale(0.3, 0.3);
    button.setPositionY(100);
    button.enableButtonMode();
    button.onPointerDown(this.onDownloadButtonClick.bind(this));

    gsap.to(button.scale, {
      x: 0.4,
      y: 0.4,
      duration: 1.5,
      yoyo: true,
      ease: 'sine.inOut',
      repeat: -1,
    });

    button.addChild(text);
    this.addChild(button.view);
  }

  private onDownloadButtonClick(): void {
    window.location.href = 'https://play.google.com/store/apps?hl=uk';
  }
}
