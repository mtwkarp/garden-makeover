import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { DecorationButtonsCollection } from '../../../core/scenes/2d/gameScene/buttons/types/types';
import { DecorationButtonNames } from '../../../core/scenes/2d/gameScene/buttons/types/enums';
import BushDecorationButton from '../../../core/scenes/2d/gameScene/buttons/decorationButtons/BushDecorationButton';
import TreeDecorationButton from '../../../core/scenes/2d/gameScene/buttons/decorationButtons/TreeDecorationButtons';
import FlowerDecorationButton from '../../../core/scenes/2d/gameScene/buttons/decorationButtons/FlowerDecorationButton';
import DiscardPickedDecorationButton from '../../../core/scenes/2d/gameScene/buttons/discardButton/DiscardPickedDecorationButton';

export const decorationPick2dButtonsModule = new ContainerModule((bind) => {
  bind<DecorationButtonsCollection>(TYPES.DecorationsPick2dButtonsCollection).toDynamicValue(
    (context): DecorationButtonsCollection => ({
      [DecorationButtonNames.bush]: context.container.resolve(BushDecorationButton),
      [DecorationButtonNames.tree]: context.container.resolve(TreeDecorationButton),
      [DecorationButtonNames.flower]: context.container.resolve(FlowerDecorationButton),
      [DecorationButtonNames.discard]: context.container.resolve(DiscardPickedDecorationButton),
    }),
  );
});
