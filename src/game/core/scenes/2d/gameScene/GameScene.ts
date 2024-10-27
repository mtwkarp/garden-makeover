import { inject, injectable } from 'inversify';
import { ContainerI, Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';
import { TYPES } from '../../../../IoC/Types';
import { DecorationButtonsManagerI } from '../../../components/2d/buttons/decoration/types/interfaces';
import { ObservableI } from '../../../../lib/observable/types/interfaces';
import { ResizeData } from '../../../observables/types/types';

@injectable()
export default class GameScene extends PixiScene implements Scene2dI {
  private readonly changeLightButton: ContainerI;

  private readonly decorationButtonsManager: DecorationButtonsManagerI;

  private readonly resizeObservable: ObservableI<ResizeData>;

  constructor(
  @inject(TYPES.ChangeLightButton) changeLightButton: ContainerI,
    @inject(TYPES.DecorationButtonsManager) decorationButtonsManager: DecorationButtonsManagerI,
    @inject(TYPES.ResizeObservable) resizeObservable: ObservableI<ResizeData>,
  ) {
    super();
    this.decorationButtonsManager = decorationButtonsManager;
    this.changeLightButton = changeLightButton;
    this.resizeObservable = resizeObservable;
    this.initialize();
  }

  private initialize(): void {
    this.createChildren();
    this.subscribe();
    this.resize();
  }

  private subscribe(): void {
    this.resizeObservable.subscribe(this.resize, this);
  }

  private createChildren(): void {
    this.changeLightButton.setScale(0.35, 0.35);
    this.addChild(this.decorationButtonsManager.getButtonsView().view, this.changeLightButton.view);
  }

  public get sceneName(): string {
    return SceneNames2d.game;
  }

  private resize(): void {
    const { screenWidth, screenHeight } = this.resizeObservable.getData();

    const buttonsView = this.decorationButtonsManager.getButtonsView();
    buttonsView.setPosition(screenWidth / 2 - 80, screenHeight / 2 - 370);

    this.changeLightButton.setPosition(-screenWidth / 2 + 80, -screenHeight / 2 + 80);
  }
}
