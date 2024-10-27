import { injectable } from 'inversify';
import AbstractMultipleValuesObservable from '../../lib/observable/AbstractMultipleValuesObservable';
import { GameProcessEvents } from './types/enums';

@injectable()
export default class GameProcessObservable extends AbstractMultipleValuesObservable<GameProcessEvents, null> {
  public getData(): any {
    return {};
  }
}
