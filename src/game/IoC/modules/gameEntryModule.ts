import { ContainerModule, interfaces } from 'inversify';
import { GameEntryI } from '../../gameEntry/types/interfaces';
import { TYPES } from '../Types';
import DefaultGameEntry from '../../gameEntry/implementations/DefaultGameEntry';

export const gameEntryModule = new ContainerModule((bind) => {
  bind<interfaces.Factory<GameEntryI>>(TYPES.GameEntryFactory).toFactory<GameEntryI>(
    (context) => (): GameEntryI => context.container.resolve<GameEntryI>(DefaultGameEntry),
  );
});
