import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { DecorationButtonsCollection } from '../../../core/components/2d/buttons/types/types';
import { DecorationButtonNames } from '../../../core/components/2d/buttons/types/enums';
import BushDecorationButton from '../../../core/components/2d/buttons/decorationButtons/BushDecorationButton';
import TreeDecorationButton from '../../../core/components/2d/buttons/decorationButtons/TreeDecorationButtons';
import FlowerDecorationButton from '../../../core/components/2d/buttons/decorationButtons/FlowerDecorationButton';
import DiscardPickedDecorationButton from '../../../core/components/2d/buttons/discardButton/DiscardPickedDecorationButton';

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
