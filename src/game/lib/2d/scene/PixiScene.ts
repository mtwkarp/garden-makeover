import PixiContainer from '../container/PixiContainer';
import { Scene2dI } from '../types/interfaces';

export default abstract class PixiScene extends PixiContainer implements Scene2dI {
  public abstract get sceneName(): string;
}
