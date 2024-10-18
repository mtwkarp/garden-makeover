export interface ContainerI {
  show(): void;
  hide(): void;
  destroy(): void;
  addChild(...children: any[]): void;
  removeChildren(...children: any[]): void;
  view: any;
}

export interface SpriteI extends ContainerI {
  setAnchor(x: number, y: number): void;
  setScale(x: number, y: number): void;
  setPosition(x: number, y: number): void;
  width: number;
  height: number;
}

export interface Scene2dI extends ContainerI {
  sceneName: string;
}
