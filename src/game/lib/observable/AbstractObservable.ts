import { injectable } from 'inversify';
import { ObservableI } from './types/interfaces';

@injectable()
export default abstract class AbstractObservable<T> implements ObservableI<T> {
  private observers: Array<{ callback: (data: T) => void; context?: any }> = [];

  public subscribe(callback: (data: T) => void, context?: any): void {
    this.observers.push({ callback, context });
  }

  public unsubscribe(callback: (data: T) => void, context?: any): void {
    for (let i = 0; i < this.observers.length; i++) {
      const observer = this.observers[i];
      if (observer.callback === callback && observer.context === context) {
        this.observers.splice(i, 1);
        break;
      }
    }
  }

  protected notify(data: T): void {
    this.observers.forEach((observer) => {
      if (observer.context) {
        observer.callback.call(observer.context, data);
      } else {
        observer.callback(data);
      }
    });
  }

  public abstract getData(): T;
}
