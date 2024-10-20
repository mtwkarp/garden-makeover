import { ContainerModule } from 'inversify';
import { EventEmitter } from 'pixi.js';
import { TYPES } from '../../Types';
import GlobalEventsManager from '../../../core/events/GlobalEventsManager';

export const eventsModule = new ContainerModule((bind) => {
  bind<EventEmitter>(TYPES.GlobalEventsManager).to(GlobalEventsManager).inSingletonScope();
});
