import { Container } from 'pixi.js';

export interface ViewObject2d {}

export interface ContainerI extends Container {
  show(): void;
  hide(): void;
  destroy(): void;
}

export interface SpriteI extends ViewObject2d {}

export interface Scene2dI extends ContainerI {
  sceneName: string;
}
