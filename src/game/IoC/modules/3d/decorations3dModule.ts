import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import {
  DraggableDecorations3dCollection,
  StaticDecorations3dCollection,
} from '../../../core/components/3d/decorations/types/types';
import SkyBackground from '../../../core/components/3d/decorations/static/background/SkyBackground';
import {
  DraggableDecorations3dManagerI,
  StaticDecorations3dManagerI,
} from '../../../core/components/3d/decorations/types/interfaces';
import StaticDecorations3dManager from '../../../core/components/3d/decorations/StaticDecorations3dManager';
import HouseDecoration from '../../../core/components/3d/decorations/static/house/HouseDecoration';
import { DraggableDecorationNames } from '../../../core/components/3d/decorations/types/enums';
import TreeDecoration from '../../../core/components/3d/decorations/draggable/treeDecoration/TreeDecoration';
import BushDecoration from '../../../core/components/3d/decorations/draggable/bushDecoration/BushDecoration';
import DraggableDecorations3dManager from '../../../core/components/3d/decorations/DraggableDecorations3dManager';
import SceneDecorationController from '../../../core/components/3d/sceneDecorator/SceneDecorationController';
import { SceneDecorationControllerI } from '../../../core/components/3d/sceneDecorator/types/interfaces';

export const decorations3dModule = new ContainerModule((bind) => {
  bind<StaticDecorations3dCollection>(TYPES.StaticDecorations3dCollection).toDynamicValue(
    (context): StaticDecorations3dCollection => [
      context.container.resolve(SkyBackground),
      context.container.resolve(HouseDecoration),
    ],
  );
  bind<StaticDecorations3dManagerI>(TYPES.Decorations3dManager).to(StaticDecorations3dManager);

  bind<DraggableDecorations3dCollection>(TYPES.DraggableDecorations3dCollection).toDynamicValue(
    (context): DraggableDecorations3dCollection => ({
      [DraggableDecorationNames.tree]: context.container.resolve(TreeDecoration),
      [DraggableDecorationNames.flower]: context.container.resolve(BushDecoration),
      [DraggableDecorationNames.bush]: context.container.resolve(BushDecoration),
    }),
  );

  bind<DraggableDecorations3dManagerI>(TYPES.DraggableDecorations3dManager).to(DraggableDecorations3dManager);

  bind<SceneDecorationControllerI>(TYPES.SceneDecorationController).to(SceneDecorationController);
});
