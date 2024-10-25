import { inject, injectable } from 'inversify';
import { ContainerI, Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';
import { TYPES } from '../../../../IoC/Types';
import {
  DecorationButtonsManagerI,
} from '../../../components/2d/buttons/decoration/types/interfaces';

@injectable()
export default class GameScene extends PixiScene implements Scene2dI {
  private readonly changeLightButton: ContainerI;

  private readonly decorationButtonsManager: DecorationButtonsManagerI;

  constructor(
  @inject(TYPES.ChangeLightButton) changeLightButton: ContainerI,
    @inject(TYPES.DecorationButtonsManager) decorationButtonsManager: DecorationButtonsManagerI,
  ) {
    super();
    this.decorationButtonsManager = decorationButtonsManager;
    this.changeLightButton = changeLightButton;
    this.initialize();
  }

  private initialize(): void {
    this.createChildren();
    this.resize();
  }

  private createChildren(): void {
    this.changeLightButton.setScale(0.35, 0.35);
    this.addChild(this.decorationButtonsManager.getButtonsView().view, this.changeLightButton.view);
  }

  public get sceneName(): string {
    return SceneNames2d.game;
  }

  private resize(): void {
    const buttonsView = this.decorationButtonsManager.getButtonsView();
    buttonsView.setPosition(window.innerWidth / 2 - 80, window.innerHeight / 2 - 370);

    this.changeLightButton.setPosition(-window.innerWidth / 2 + 80, -window.innerHeight / 2 + 80);
  }
}
