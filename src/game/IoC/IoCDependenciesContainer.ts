import { Container, ContainerModule } from 'inversify';
import { IoCDependenciesContainerI } from './types/interfaces';
import { gameEntryModule } from './modules/gameEntryModule';
import { engineModule2d } from './modules/engines/engineModule2d';
import { engineModule3d } from './modules/engines/engineModule3d';
import { updateEngineModule } from './modules/engines/updateEngineModule';
import { appModule } from './modules/appModule';
import { scenes2dModule } from './modules/2d/scenes2dModule';
import { assetLoadersModule } from './modules/assetLoaders/assetLoadersModule';
import { gameModule } from './modules/gameModule';

export default class IoCDependenciesContainer extends Container implements IoCDependenciesContainerI {
  private modules: ContainerModule[] = [
    gameEntryModule,
    engineModule2d,
    engineModule3d,
    updateEngineModule,
    appModule,
    scenes2dModule,
    assetLoadersModule,
    gameModule,
  ];

  public loadDependencies(): void {
    this.load(...this.modules);
  }
}
