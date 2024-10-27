import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { DecorationTargetAreasControllerI } from '../../../core/components/3d/targetArea/types/interfaces';
import DecorationTargetAreasController from '../../../core/components/3d/targetArea/DecorationTargetAreasController';
import { DecorationTargetAreasCollection } from '../../../core/components/3d/targetArea/types/types';
import DecorationTargetArea from '../../../core/components/3d/targetArea/targetAreas/DecorationTargetArea';

export const targetAreasModule = new ContainerModule((bind) => {
  bind<DecorationTargetAreasControllerI>(TYPES.DecorationTargetAreasController).to(DecorationTargetAreasController);
  bind<DecorationTargetAreasCollection>(TYPES.DecorationTargetAreaCollection).toDynamicValue(
    (context): DecorationTargetAreasCollection => {
      const collection: DecorationTargetAreasCollection = [];

      for (let i = 0; i < 3; i++) {
        const targetArea = context.container.resolve(DecorationTargetArea);
        collection.push(targetArea);
      }

      return collection;
    },
  );
});
