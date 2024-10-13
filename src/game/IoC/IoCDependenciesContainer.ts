import { Container, ContainerModule } from 'inversify';
import { IoCDependenciesContainerI } from './types/interfaces';
import { gameEntryModule } from './modules/gameEntryModule';
import { engineModule2d } from './modules/engines/engineModule2d';
import { engineModule3d } from './modules/engines/engineModule3d';
import { updateEngineModule } from './modules/engines/updateEngineModule';
import { appModule } from './modules/appModule';

export default class IoCDependenciesContainer extends Container implements IoCDependenciesContainerI {
  private modules: ContainerModule[] = [gameEntryModule, engineModule2d, engineModule3d, updateEngineModule, appModule];

  public loadDependencies(): void {
    this.load(...this.modules);
  }
}
