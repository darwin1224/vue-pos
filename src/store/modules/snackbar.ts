import store from '@/store';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'snackbar',
  namespaced: true,
  dynamic: true,
  store,
})
class SnackBarModule extends VuexModule {
  public message: string = '';

  public isToggle: boolean = false;

  @Mutation
  private setMessage(message: string): void {
    this.message = message;
  }

  @Mutation
  private setIsToggle(isToggle: boolean): void {
    this.isToggle = isToggle;
  }

  @Action({ rawError: true })
  public async open(message?: string): Promise<void> {
    this.setIsToggle(true);
    this.setMessage(message || 'Snackbar appears');
  }

  @Action({ rawError: true })
  public async close(): Promise<void> {
    this.setIsToggle(false);
  }
}

export default getModule(SnackBarModule);
