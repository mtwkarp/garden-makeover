import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { DragControllerI } from '../../../core/components/3d/dragControls/types/interfaces';
import { DragController } from '../../../core/components/3d/dragControls/DragController';

export const dragControlsModule = new ContainerModule((bind) => {
  bind<DragControllerI>(TYPES.DragController).to(DragController);
});
