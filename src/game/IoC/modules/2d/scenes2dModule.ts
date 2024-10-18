import { ContainerModule } from 'inversify';
import { TYPES } from '../../Types';
import { Scenes2dGetter } from '../../../core/scenes/2d/types/types';
import { SceneNames2d } from '../../../core/scenes/2d/types/enums';
import SplashScene from '../../../core/scenes/2d/splashScene/SplashScene';
import { Scene2dI } from '../../../lib/2d/types/interfaces';
import { MainScene2dI } from '../../../core/scenes/2d/mainScene2d/types/interfaces';
import MainScene2d from '../../../core/scenes/2d/mainScene2d/MainScene2d';

export const scenes2dModule = new ContainerModule((bind) => {
  bind<Scenes2dGetter>(TYPES.Scenes2dGetter).toFactory((context) => {
    const scenesByNames: Partial<Record<SceneNames2d, new () => Scene2dI>> = {
      [SceneNames2d.splash]: SplashScene,
    };

    return (sceneName: SceneNames2d): Scene2dI | never => {
      const scene = scenesByNames[sceneName];

      if (!scene) {
        throw new Error(`No scene with name ${sceneName} found.`);
      }

      return context.container.resolve(scene);
    };
  });

  bind<MainScene2dI>(TYPES.MainScene2d).to(MainScene2d).inSingletonScope();
});
