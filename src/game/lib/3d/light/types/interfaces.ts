export interface LightI {
  setPosition(x: number, y: number, z: number): void;
  setColor(color: number): void;
  setIntensity(intensity: number): void;
  setCastShadow(cast: boolean): void;
  lookAt(x: number, y: number, z: number): void;
  view: any;
}
