import { injectable } from 'inversify';
import AbstractObservable from '../../lib/observable/AbstractObservable';
import { ResizeData } from './types/types';

@injectable()
export default class ResizeObservable extends AbstractObservable<ResizeData> {
  constructor() {
    super();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  protected onResize(): void {
    this.notify(this.getData());
  }

  public getData(): ResizeData {
    return {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    };
  }
}
