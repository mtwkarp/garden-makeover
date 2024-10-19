import { TickerCB } from './types';

export interface UpdateEngineI {
  initialize(): void;
  addCallbackToUpdateLoop(cb: TickerCB): void;
}

export interface GraphicsEngineI {
  update: TickerCB;
  initialize(): Promise<void>;
}

export interface GraphicsEngine3dI extends GraphicsEngineI {
  scene: any;
}
