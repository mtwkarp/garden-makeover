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
import { scene3dModule } from './modules/3d/scene3dModule';
import { decorations3dModule } from './modules/3d/decorations3dModule';
import { buttons2dModule } from './modules/2d/buttons2dModule';
import { eventsModule } from './modules/events/eventsModule';
import { targetAreasModule } from './modules/3d/targetAreasModule';

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
    scene3dModule,
    decorations3dModule,
    buttons2dModule,
    eventsModule,
    targetAreasModule,
  ];

  public loadDependencies(): void {
    this.load(...this.modules);
  }
}
