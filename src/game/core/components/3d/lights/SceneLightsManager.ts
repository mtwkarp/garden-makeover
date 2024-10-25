import { inject, injectable } from 'inversify';
import { SceneLightsManagerI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { Elements3dThemeModeServiceI, ThemedLightI } from '../../../lightModes/types/interfaces';

@injectable()
export default class SceneLightsManager implements SceneLightsManagerI {
  private readonly lights: ThemedLightI[];

  constructor(
  @inject(TYPES.SceneLightsCollection) lights: ThemedLightI[],
    @inject(TYPES.Elements3dThemeModeService) lightModeService: Elements3dThemeModeServiceI,
  ) {
    this.lights = lights;
    this.lights.forEach((light) => lightModeService.registerElement(light));
  }

  public getSceneLights(): any[] {
    return this.lights.map((light) => light.view);
  }
}
