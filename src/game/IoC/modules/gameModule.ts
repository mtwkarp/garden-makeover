import { ContainerModule } from 'inversify';
import { TYPES } from '../Types';
import { GameI } from '../../core/game/types/interfaces';
import Game from '../../core/game/Game';

export const gameModule = new ContainerModule((bind) => {
  bind<GameI>(TYPES.Game).to(Game);
});
