import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { MultipleValuesObservableI, ObservableI } from '../../../lib/observable/types/interfaces';
import { ResizeData } from '../../../core/observables/types/types';
import ResizeObservable from '../../../core/observables/ResizeObservable';
import { GameProcessEvents, DecorationButtonsInteractionEvents } from '../../../core/observables/types/enums';
import { DecorationButtonNames } from '../../../core/components/2d/buttons/decoration/types/enums';
import DecorationButtonsInteractionObservable from '../../../core/observables/DecorationButtonsInteractionObservable';
import GameProcessObservable from '../../../core/observables/GameProcessObservable';

export const observablesModule = new ContainerModule((bind) => {
  bind<ObservableI<ResizeData>>(TYPES.ResizeObservable).to(ResizeObservable).inSingletonScope();
  bind<MultipleValuesObservableI<DecorationButtonsInteractionEvents, DecorationButtonNames>>(
    TYPES.DecorationButtonsInteractionObservable,
  )
    .to(DecorationButtonsInteractionObservable)
    .inSingletonScope();
  bind<MultipleValuesObservableI<GameProcessEvents, null>>(TYPES.GameProcessObservable)
    .to(GameProcessObservable)
    .inSingletonScope();
});
