import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import {
  Elements3dThemeModeServiceI,
  ThemeModeServiceI,
  UIThemeModeServiceI,
} from '../../../core/lightModes/types/interfaces';
import { UIThemeModeService } from '../../../core/lightModes/services/UIThemeModeService';
import { ThemeModeManager } from '../../../core/lightModes/ThemeModeManager';
import { ThemeModeServicesCollection } from '../../../core/lightModes/types/types';
import { Elements3dThemeModeService } from '../../../core/lightModes/services/Elements3dThemeModeService';

export const themesModule = new ContainerModule((bind) => {
  bind<UIThemeModeServiceI>(TYPES.UIThemeModeService).to(UIThemeModeService).inSingletonScope();
  bind<Elements3dThemeModeServiceI>(TYPES.Elements3dThemeModeService).to(Elements3dThemeModeService).inSingletonScope();
  bind<ThemeModeServicesCollection>(TYPES.ThemeModeServices).toDynamicValue(
    ({ container }): ThemeModeServicesCollection => [
      container.get(TYPES.UIThemeModeService),
      container.get(TYPES.Elements3dThemeModeService),
    ],
  );
  bind<ThemeModeServiceI>(TYPES.ThemeModeManager).to(ThemeModeManager);
});
