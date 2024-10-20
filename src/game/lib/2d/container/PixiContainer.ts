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
