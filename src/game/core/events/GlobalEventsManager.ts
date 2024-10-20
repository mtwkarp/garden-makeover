import { EventEmitter } from 'pixi.js';
import { injectable } from 'inversify';

@injectable()
export default class GlobalEventsManager implements EventEmitter {
  private eventEmitter: EventEmitter = new EventEmitter();

  public addListener<T extends string | symbol>(
    event: T,
    fn: EventEmitter.EventListener<string | symbol, T>,
    context: any,
  ): this {
    this.eventEmitter.addListener(event, fn, context);

    return this;
  }

  public emit<T extends string | symbol>(event: T, args: any): boolean {
    return this.eventEmitter.emit(event, args);
  }

  public eventNames(): Array<EventEmitter.EventNames<string | symbol>> {
    return this.eventEmitter.eventNames();
  }

  public listenerCount(event: EventEmitter.EventNames<string | symbol>): number {
    return this.eventEmitter.listenerCount(event);
  }

  public listeners<T extends string | symbol>(event: T): Array<EventEmitter.EventListener<string | symbol, T>> {
    return this.eventEmitter.listeners(event);
  }

  public off<T extends string | symbol>(
    event: T,
    fn: EventEmitter.EventListener<string | symbol, T> | undefined,
    context: any,
    once: boolean | undefined,
  ): this {
    this.eventEmitter.off(event, fn, context, once);

    return this;
  }

  public on<T extends string | symbol>(event: T, fn: EventEmitter.EventListener<string | symbol, T>, context: any): this {
    this.eventEmitter.on(event, fn, context);
    return this;
  }

  public once<T extends string | symbol>(event: T, fn: EventEmitter.EventListener<string | symbol, T>, context: any): this {
    this.eventEmitter.once(event, fn, context);
    return this;
  }

  public removeAllListeners(event: EventEmitter.EventNames<string | symbol> | undefined): this {
    this.eventEmitter.removeAllListeners(event);

    return this;
  }

  public removeListener<T extends string | symbol>(
    event: T,
    fn: EventEmitter.EventListener<string | symbol, T> | undefined,
    context: any,
    once: boolean | undefined,
  ): this {
    this.eventEmitter.removeListener(event, fn, context, once);
    return this;
  }
}
