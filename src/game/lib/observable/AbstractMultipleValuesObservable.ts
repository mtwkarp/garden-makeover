import { injectable } from 'inversify';
import { MultipleValuesObservableI } from './types/interfaces';

@injectable()
export default abstract class AbstractMultipleValuesObservable<TEventType extends string | number | symbol, TData>
implements MultipleValuesObservableI<TEventType, TData> {
  private observers: Map<TEventType, Array<{ callback: (data: TData) => void; context?: any }>> = new Map();

  public subscribe(eventType: TEventType, callback: (data: TData) => void, context?: any): void {
    if (!this.observers.has(eventType)) {
      this.observers.set(eventType, []);
    }
    this.observers.get(eventType)!.push({ callback, context });
  }

  public unsubscribe(eventType: TEventType, callback: (data: TData) => void, context?: any): void {
    const observersForEvent = this.observers.get(eventType);
    if (observersForEvent) {
      for (let i = 0; i < observersForEvent.length; i++) {
        const observer = observersForEvent[i];
        if (observer.callback === callback && observer.context === context) {
          observersForEvent.splice(i, 1);
          break;
        }
      }
      if (observersForEvent.length === 0) {
        this.observers.delete(eventType);
      }
    }
  }

  public notify(eventType: TEventType, data: TData): void {
    const observersForEvent = this.observers.get(eventType);
    if (observersForEvent) {
      observersForEvent.forEach((observer) => {
        if (observer.context) {
          observer.callback.call(observer.context, data);
        } else {
          observer.callback(data);
        }
      });
    }
  }

  abstract getData(eventType: TEventType): TData;
}
