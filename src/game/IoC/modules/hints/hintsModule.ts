import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { HintsManagerI } from '../../../core/components/2d/hint/types/interfaces';
import HintArrow2d from '../../../core/components/2d/hint/implementations/HintArrow2d';
import HintArrow3d from '../../../core/components/2d/hint/implementations/HintArrow3d';
import HintsManager from '../../../core/components/2d/hint/HintsManager';
import { HintsCollection } from '../../../core/components/2d/hint/types/types';

export const hintsModule = new ContainerModule((bind) => {
  bind<HintsManagerI>(TYPES.HintsManager).to(HintsManager);
  bind<HintsCollection>(TYPES.HintsCollection).toDynamicValue(
    ({ container }): HintsCollection => ({
      hints2d: [container.resolve(HintArrow2d)],
      hints3d: [container.resolve(HintArrow3d)],
    }),
  );
});
