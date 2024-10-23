export interface ContainerI {
  show(): void;
  hide(): void;
  destroy(): void;
  addChild(...children: any[]): void;
  removeChildren(...children: any[]): void;
  setRotation(rotation: number): void;
  view: any;
  setScale(x: number, y: number): void;
  setPosition(x: number, y: number): void;
  setPositionY(y: number): void;
  setPositionX(x: number): void;
  makeInteractive(): void;
  makeNoninteractive(): void;
  enableButtonMode(): void;
  disableButtonMode(): void;
  onPointerDown(cb: (...args: any) => any): void;
  offPointerDown(cb: (...args: any) => any): void;
  setTint(tint: number): void;
  scale: { x: number; y: number };
  position: { x: number; y: number };
  width: number;
  height: number;
}

export interface SpriteI extends ContainerI {
  setAnchor(x: number, y: number): void;
}

export interface Scene2dI extends ContainerI {
  sceneName: string;
}
