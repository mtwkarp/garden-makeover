import { injectable } from 'inversify';
import { Light } from 'three';
import ThreeLight from '../../../../lib/3d/light/ThreeLight';
import { ThemedLightI } from '../../../lightModes/types/interfaces';
import { LightModes } from '../../../lightModes/types/enums';

@injectable()
export default abstract class AbstractLight extends ThreeLight implements ThemedLightI {
  protected abstract override light: Light;

  public applyTheme(lightMode: LightModes): void {
    if (lightMode === LightModes.day) {
      this.applyDayTheme();
    } else {
      this.applyNightTheme();
    }
  }

  protected abstract applyDayTheme(): void;

  protected abstract applyNightTheme(): void;
}
