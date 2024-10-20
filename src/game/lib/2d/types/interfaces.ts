export interface ContainerI {
  show(): void;
  hide(): void;
  destroy(): void;
  addChild(...children: any[]): void;
  removeChildren(...children: any[]): void;
  view: any;
  setScale(x: number, y: number): void;
  setPosition(x: number, y: number): void;
  setPositionY(y: number): void;
  setPositionX(x: number): void;
  width: number;
  height: number;
}

export interface SpriteI extends ContainerI {
  setAnchor(x: number, y: number): void;
}

export interface Scene2dI extends ContainerI {
  sceneName: string;
}
