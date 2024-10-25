import { injectable } from 'inversify';
import AbstractMultipleValuesObservable from '../../lib/observable/AbstractMultipleValuesObservable';
import { DecorationButtonsInteractionEvents } from './types/enums';
import { DecorationButtonNames } from '../components/2d/buttons/decoration/types/enums';

@injectable()
export default class DecorationButtonsInteractionObservable extends AbstractMultipleValuesObservable<
DecorationButtonsInteractionEvents,
DecorationButtonNames
> {
  public getData(): any {
    return {};
  }
}
