import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';

import { ContainerI } from '../../../lib/2d/types/interfaces';

import HintArrow2d from '../../../core/components/2d/hint/HintArrow2d';

export const hint2dModule = new ContainerModule((bind) => {
  bind<ContainerI>(TYPES.HintArrow2d).to(HintArrow2d);
});
