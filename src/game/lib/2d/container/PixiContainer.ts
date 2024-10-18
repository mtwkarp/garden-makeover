import { Container } from 'pixi.js';
import { ContainerI } from '../types/interfaces';

export default class PixiContainer extends Container implements ContainerI {
  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  public override destroy(): void {
    super.destroy();
  }
}
