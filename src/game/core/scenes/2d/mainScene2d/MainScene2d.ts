import { inject, injectable } from 'inversify';
import { SceneNames2d } from '../types/enums';
import { MainScene2dI } from './types/interfaces';
import { Scenes2dByNames, Scenes2dGetter } from '../types/types';
import { TYPES } from '../../../../IoC/Types';
import { Scene2dI } from '../../../../lib/2d/types/interfaces';
import PixiScene from '../../../../lib/2d/scene/PixiScene';
import { MultipleValuesObservableI } from '../../../../lib/observable/types/interfaces';
import { GameProcessEvents } from '../../../observables/types/enums';

@injectable()
export default class MainScene2d extends PixiScene implements MainScene2dI {
  private readonly scenesGetter: Scenes2dGetter;

  private activeScenes: Scenes2dByNames = {};

  private readonly gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>;

  constructor(
  @inject(TYPES.Scenes2dGetter) scenesGetter: Scenes2dGetter,
    @inject(TYPES.GameProcessObservable) gameProcessObservable: MultipleValuesObservableI<GameProcessEvents, null>,
  ) {
    super();
    this.scenesGetter = scenesGetter;
    this.gameProcessObservable = gameProcessObservable;
    this.subscribe();
  }

  private subscribe(): void {
    this.gameProcessObservable.subscribe(GameProcessEvents.allDecorationsSuccessfullyPlaced, this.showOutro, this);
  }

  private showOutro(): void {
    this.showScene(SceneNames2d.outro);
  }

  public get sceneName(): string {
    return SceneNames2d.main;
  }

  private getActiveSceneByName(name: SceneNames2d): Scene2dI | never {
    const scene = this.activeScenes[name];

    if (!scene) {
      throw new Error(`No scene with name ${name} found.`);
    }

    return scene;
  }

  public showScene(name: SceneNames2d): void {
    const scene = this.scenesGetter(name);
    scene.show();

    this.activeScenes[name] = scene;

    this.addChild(scene.view);
  }

  public hideScene(name: SceneNames2d): void {
    const scene = this.getActiveSceneByName(name);
    scene.hide();
  }

  public destroyScene(name: SceneNames2d): void {
    const scene = this.getActiveSceneByName(name);
    scene.destroy();
  }
}
