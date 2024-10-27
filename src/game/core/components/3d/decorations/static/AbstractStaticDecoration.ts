import { Group, Object3DEventMap, Object3D } from 'three';
import { injectable } from 'inversify';
import { StaticDecoration3dI } from '../types/interfaces';
import { ThemedElementI } from '../../../../lightModes/types/interfaces';
import { LightModes } from '../../../../lightModes/types/enums';

@injectable()
export default abstract class AbstractStaticDecoration implements StaticDecoration3dI, ThemedElementI {
  public abstract getDecoration(): Group<Object3DEventMap> | Object3D<Object3DEventMap>;

  public applyTheme(lightMode: LightModes): void {
    if (lightMode === LightModes.day) {
      this.setDayMode();
    } else {
      this.setNightMode();
    }
  }

  protected abstract setNightMode(): void;

  protected abstract setDayMode(): void;
}
