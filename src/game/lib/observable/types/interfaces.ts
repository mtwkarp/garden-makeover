export interface ObservableI<T> {
  subscribe(callback: (data: T) => void, context?: any): void;
  unsubscribe(callback: (data: T) => void, context?: any): void;
  getData(): T;
}

export interface MultipleValuesObservableI<TEventType extends string | number | symbol, TData> {
  subscribe(eventType: TEventType, callback: (data: TData) => void, context?: any): void;
  unsubscribe(eventType: TEventType, callback: (data: TData) => void, context?: any): void;
  notify(eventType: TEventType, data: TData): void;
}
