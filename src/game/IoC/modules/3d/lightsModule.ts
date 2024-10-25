import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { SceneLightsManagerI } from '../../../core/components/3d/lights/types/interfaces';
import SceneLightsManager from '../../../core/components/3d/lights/SceneLightsManager';
import AmbientLight from '../../../core/components/3d/lights/AmbientLight';
import FillLight from '../../../core/components/3d/lights/FillLight';
import MainLight from '../../../core/components/3d/lights/MainLight';
import { ThemedLightI } from '../../../core/lightModes/types/interfaces';

export const lightsModule = new ContainerModule((bind) => {
  bind<SceneLightsManagerI>(TYPES.SceneLightsManager).to(SceneLightsManager);
  bind<ThemedLightI[]>(TYPES.SceneLightsCollection).toDynamicValue(({ container }): ThemedLightI[] => [
    container.resolve(AmbientLight),
    container.resolve(FillLight),
    container.resolve(MainLight),
  ]);
});
