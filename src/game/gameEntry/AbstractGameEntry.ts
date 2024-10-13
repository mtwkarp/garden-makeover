import { injectable } from 'inversify';
import { GameEntryI } from './types/interfaces';

@injectable()
export default abstract class AbstractGameEntry implements GameEntryI {
  public abstract run(): void;
}
