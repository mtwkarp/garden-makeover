import { Sprite, Texture } from 'pixi.js';
import { SpriteI } from '../types/interfaces';
import PixiContainer from '../container/PixiContainer';

export default class PixiSprite extends PixiContainer implements SpriteI {
  protected override container: Sprite;

  constructor(textureName?: string) {
    super();
    if (textureName) {
      this.container = new Sprite(Texture.from(textureName));
    } else {
      this.container = new Sprite();
    }

    this.container.anchor.set(0.5);
    this.container.interactive = true;
  }

  public setAnchor(x: number, y: number): void {
    this.container.anchor.set(x, y);
  }
}
