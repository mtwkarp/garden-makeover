import { Container } from 'pixi.js';
import { injectable } from 'inversify';
import { ContainerI } from '../types/interfaces';

@injectable()
export default class PixiContainer implements ContainerI {
  protected container: Container<any>;

  constructor() {
    this.container = new Container();
    this.container.interactive = true;
  }

  public setRotation(rotation: number): void {
    this.container.rotation = rotation;
  }

  public get scale(): { x: number; y: number } {
    return this.container.scale;
  }

  public get position(): { x: number; y: number } {
    return this.container.position;
  }

  public setTint(tint: number): void {
    this.container.tint = tint;
  }

  public enableButtonMode(): void {
    this.container.cursor = 'pointer';
  }

  public disableButtonMode(): void {
    this.container.cursor = '';
  }

  public makeNoninteractive(): void {
    this.container.interactive = false;
  }

  public makeInteractive(): void {
    this.container.interactive = true;
  }

  public show(): void {
    this.container.visible = true;
  }

  public hide(): void {
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

  public onPointerDown(cb: (...args: any) => any): void {
    this.container.on('pointerdown', cb);
  }

  public offPointerDown(cb: (...args: any) => any): void {
    this.container.off('pointerdown', cb);
  }

  public get alpha(): number {
    return this.container.alpha;
  }

  public set alpha(value: number) {
    this.container.alpha = value;
  }
}
