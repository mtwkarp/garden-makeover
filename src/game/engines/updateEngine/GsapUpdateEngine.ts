import { injectable } from 'inversify';
import gsap from 'gsap';
import { UpdateEngineI } from '../types/interfaces';
import { TickerCB } from '../types/types';

@injectable()
export default class GsapUpdateEngine implements UpdateEngineI {
  public initialize(): void {
    gsap.ticker.wake();
  }

  public addCallbackToUpdateLoop(cb: TickerCB): void {
    gsap.ticker.add(cb);
  }
}
