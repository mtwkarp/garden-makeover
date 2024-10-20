import { inject, injectable } from 'inversify';
import { ContainerI, Scene2dI } from '../../../../lib/2d/types/interfaces';
import { SceneNames2d } from '../types/enums';
import PixiScene from '../../../../lib/2d/scene/PixiScene';
import { TYPES } from '../../../../IoC/Types';
import { DecorationButtonsCollection } from './buttons/types/types';
import PixiContainer from '../../../../lib/2d/container/PixiContainer';
import { DecorationButtonNames } from './buttons/types/enums';
import { DecorationPickButtonI } from './buttons/types/interfaces';

@injectable()
export default class GameScene extends PixiScene implements Scene2dI {
  private readonly buttons: DecorationButtonsCollection;

  private readonly buttonsArr: DecorationPickButtonI[];

  private buttonsContainer: ContainerI;

  constructor(@inject(TYPES.DecorationsPick2dButtonsCollection) decorationPickButtons: DecorationButtonsCollection) {
    super();
    this.buttons = decorationPickButtons;
    this.buttonsArr = Object.keys(this.buttons).map((key) => this.buttons[key as DecorationButtonNames]);
    this.initialize();
  }

  private initialize(): void {
    this.createChildren();
    this.setPositionsForButtons();
  }

  private createChildren(): void {
    this.buttonsContainer = new PixiContainer();
    this.buttonsContainer.setPosition(window.innerWidth / 2 - 80, window.innerHeight / 2 - 370);

    this.buttonsContainer.addChild(
      this.buttons[DecorationButtonNames.discard].view,
      this.buttons[DecorationButtonNames.flower].view,
      this.buttons[DecorationButtonNames.bush].view,
      this.buttons[DecorationButtonNames.tree].view,
    );

    this.addChild(this.buttonsContainer.view);
  }

  private setPositionsForButtons(): void {
    for (let i = 0; i < this.buttonsArr.length; i++) {
      const button = this.buttonsArr[i];

      button.setPositionY(i * 100);
      button.setScale(0.35, 0.35);
    }
  }

  private subscribe(): void {}

  public get sceneName(): string {
    return SceneNames2d.game;
  }
}
