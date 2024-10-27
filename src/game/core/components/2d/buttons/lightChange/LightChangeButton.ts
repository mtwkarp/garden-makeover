import { inject, injectable } from 'inversify';
import PixiContainer from '../../../../../lib/2d/container/PixiContainer';
import { TYPES } from '../../../../../IoC/Types';
import PixiSprite from '../../../../../lib/2d/sprite/PixiSprite';
import { ThemeModeManagerI, UIThemeModeServiceI } from '../../../../lightModes/types/interfaces';
import AbstractButton from '../AbstractButton';

@injectable()
export default class LightChangeButton extends AbstractButton {
  protected readonly themeModeManager: ThemeModeManagerI;

  protected readonly themeModeService: UIThemeModeServiceI;

  constructor(
  @inject(TYPES.ThemeModeManager) themeModeManager: ThemeModeManagerI,
    @inject(TYPES.UIThemeModeService) themeModeService: UIThemeModeServiceI,
  ) {
    super();
    this.themeModeManager = themeModeManager;
    this.themeModeService = themeModeService;
    this.initialize();
  }

  protected subscribe(): void {
    this.onPointerDown(this.onClick.bind(this));
    this.themeModeService.registerUIElement(this);
  }

  protected onClick(): void {
    this.animateClick();
    this.triggerClickEvent();
  }

  protected createButtonBackground(): void {
    this.background = new PixiSprite('gameScreen/buttons/simple-button.png');
    this.background.enableButtonMode();

    this.spritesContainer.addChild(this.background.view);
  }

  protected createIcon(): void {
    const icon = new PixiSprite('gameScreen/icons/light_bulb.png');
    icon.setScale(0.7, 0.7);
    icon.enableButtonMode();

    this.spritesContainer.addChild(icon.view);
  }

  protected createSpritesContainer(): void {
    this.spritesContainer = new PixiContainer();
    this.addChild(this.spritesContainer.view);
  }

  protected prepare(): void {
    this.makeInteractive();
    this.enableButtonMode();
  }

  protected initialize(): void {
    this.prepare();
    this.createChildren();
    this.subscribe();
  }

  protected createChildren(): void {
    this.createSpritesContainer();
    this.createButtonBackground();
    this.createIcon();
  }

  protected triggerClickEvent(): void {
    this.themeModeManager.toggleMode();
  }
}
