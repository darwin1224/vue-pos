import store from '@/store';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'modal',
  namespaced: true,
  dynamic: true,
  store,
})
class ModalModule extends VuexModule {
  public data: any = null;

  public isToggle: boolean = false;

  @Mutation
  private setDataModal(data: any): void {
    this.data = data;
  }

  @Mutation
  private setIsToggle(isToggle: boolean): void {
    this.isToggle = isToggle;
  }

  @Action({ rawError: true })
  public async setData(data: any): Promise<void> {
    this.setDataModal(data);
  }

  @Action({ rawError: true })
  public async setToggle(isToggle: boolean): Promise<void> {
    this.setIsToggle(isToggle);
  }
}

export default getModule(ModalModule);
