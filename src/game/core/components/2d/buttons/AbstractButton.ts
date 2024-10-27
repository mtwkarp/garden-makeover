import { injectable } from 'inversify';
import gsap from 'gsap';
import PixiContainer from '../../../../lib/2d/container/PixiContainer';
import { ContainerI, SpriteI } from '../../../../lib/2d/types/interfaces';
import { ThemedUIElementI } from '../../../lightModes/types/interfaces';
import { LightModes } from '../../../lightModes/types/enums';

@injectable()
export default abstract class AbstractButton extends PixiContainer implements ThemedUIElementI {
  protected spritesContainer: ContainerI = new PixiContainer();

  protected clickAnimationFinished: boolean = true;

  protected buttonBackgroundTint: number = 0xecffdc;

  protected background: SpriteI;

  public applyTheme(lightMode: LightModes): void {
    if (lightMode === LightModes.day) {
      this.setDayMode();
    } else {
      this.setNightMode();
    }
  }

  protected setNightMode(): void {
    if (this.background) {
      this.background.setTint(0x6f8faf);
    }
  }

  protected setDayMode(): void {
    if (this.background) {
      this.background.setTint(this.buttonBackgroundTint);
    }
  }

  protected animateClick(): void {
    if (!this.clickAnimationFinished) {
      return;
    }

    this.clickAnimationFinished = false;
    gsap.to(this.spritesContainer.scale, {
      duration: 0.15,
      x: 0.85,
      y: 0.85,
      ease: 'power1.out',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.clickAnimationFinished = true;
      },
    });
  }
}
