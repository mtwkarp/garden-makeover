import { ContainerModule } from 'inversify';
import { TYPES } from '../Types';
import { AppI } from '../../app/types/interfaces';
import App from '../../app/App';

export const appModule = new ContainerModule((bind) => {
  bind<AppI>(TYPES.App).to(App);
});
