import { Container } from 'pixi.js';
import { injectable } from 'inversify';
import { ContainerI } from '../types/interfaces';

@injectable()
export default class PixiContainer implements ContainerI {
  protected container: Container<any>;

  constructor() {
    this.container = new Container();
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
}
