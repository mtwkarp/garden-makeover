import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { DecorationButtonsCollection } from '../../../core/components/2d/buttons/decoration/types/types';
import { DecorationButtonNames } from '../../../core/components/2d/buttons/decoration/types/enums';
import BushDecorationButton from '../../../core/components/2d/buttons/decoration/decorationButtons/BushDecorationButton';
import TreeDecorationButton from '../../../core/components/2d/buttons/decoration/decorationButtons/TreeDecorationButtons';
import FlowerDecorationButton from '../../../core/components/2d/buttons/decoration/decorationButtons/FlowerDecorationButton';
import DiscardPickedDecorationButton from '../../../core/components/2d/buttons/decoration/discardButton/DiscardPickedDecorationButton';
import { ContainerI } from '../../../lib/2d/types/interfaces';
import LightChangeButton from '../../../core/components/2d/buttons/lightChange/LightChangeButton';
import { DecorationButtonsManager } from '../../../core/components/2d/buttons/decoration/DecorationButtonsManager';
import { DecorationButtonsManagerI } from '../../../core/components/2d/buttons/decoration/types/interfaces';

export const buttons2dModule = new ContainerModule((bind) => {
  bind<DecorationButtonsCollection>(TYPES.DecorationsPick2dButtonsCollection).toDynamicValue(
    (context): DecorationButtonsCollection => ({
      [DecorationButtonNames.bush]: context.container.resolve(BushDecorationButton),
      [DecorationButtonNames.tree]: context.container.resolve(TreeDecorationButton),
      [DecorationButtonNames.flower]: context.container.resolve(FlowerDecorationButton),
      [DecorationButtonNames.discard]: context.container.resolve(DiscardPickedDecorationButton),
    }),
  );

  bind<ContainerI>(TYPES.ChangeLightButton).to(LightChangeButton);
  bind<DecorationButtonsManagerI>(TYPES.DecorationButtonsManager).to(DecorationButtonsManager);
});
