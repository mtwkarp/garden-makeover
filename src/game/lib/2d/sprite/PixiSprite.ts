import { Sprite, Texture } from 'pixi.js';
import { SpriteI } from '../types/interfaces';

export default class PixiSprite implements SpriteI {
  protected container: Sprite;

  constructor(textureName?: string) {
    if (textureName) {
      this.container = new Sprite(Texture.from(textureName));
    } else {
      this.container = new Sprite();
    }

    this.container.anchor.set(0.5);
    this.container.interactive = true;
  }

  public show() {
    this.container.visible = true;
  }

  public hide() {
    this.container.visible = false;
  }

  public destroy(): void {
    this.container.destroy();
  }

  public addChild(...children: any[]): void {
    this.container.addChild(...children);
  }

  public removeChildren(...children: any[]): void {
    this.container.removeChild(...children);
  }

  public get view(): any {
    return this.container;
  }

  public setAnchor(x: number, y: number): void {
    this.container.anchor.set(x, y);
  }

  public setScale(x: number, y: number): void {
    this.container.scale.set(x, y);
  }

  public setPosition(x: number, y: number): void {
    this.container.position.set(x, y);
  }

  public setPositionY(y: number): void {
    this.container.position.y = y;
  }

  public setPositionX(x: number): void {
    this.container.position.x = x;
  }

  public get width(): number {
    return this.container.width;
  }

  public get height(): number {
    return this.container.height;
  }
}
