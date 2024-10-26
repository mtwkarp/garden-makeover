import { injectable } from 'inversify';
import { HintI } from './types/interfaces';
import { HintState } from './types/enums';
import { HintIds } from './types/types';

@injectable()
export default abstract class AbstractHint implements HintI {
  protected state: HintState = HintState.Pending;

  public abstract id: HintIds;

  public abstract display(): void;
  public abstract hide(): void;

  public abstract initialize(): void;

  public markCompleted(): void {
    this.state = HintState.Completed;
  }

  public shouldDisplay(): boolean {
    return this.state === HintState.Pending;
  }

  public abstract view: any;
}
