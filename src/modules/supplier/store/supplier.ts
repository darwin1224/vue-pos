import store from '@/store';
import { ISupplier } from '@typings/models';
import axios from 'axios';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'article',
  namespaced: true,
  dynamic: true,
  store,
})
class SupplierModule extends VuexModule {
  public data: ISupplier[] = [];

  public dataById: ISupplier = {};

  public isLoading: boolean = false;

  @Mutation
  private setSuppliers(data: ISupplier[]): void {
    this.data = data;
  }

  @Mutation
  private setSupplierById(dataById: ISupplier): void {
    this.dataById = dataById;
  }

  @Mutation
  private addSupplier(params: ISupplier): void {
    this.data = this.data.concat(params);
  }

  @Mutation
  private editSupplier({ id, params }: { id: number; params: ISupplier }): void {
    const index = this.data.findIndex((item: ISupplier) => item.id === id);
    index !== -1 && this.data.splice(index, 1, params);
  }

  @Mutation
  private removeSupplier(id: number): void {
    this.data = this.data.filter((item: ISupplier) => item.id !== id);
  }

  @Mutation
  private setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  @Action({ rawError: true })
  public async getAllSupplier(): Promise<ISupplier[] | boolean> {
    try {
      this.setIsLoading(true);
      const { data } = await axios.get<ISupplier[]>('http://localhost:3000/supplier');
      this.setSuppliers(data);
      return data;
    } catch (err) {
      return false;
    } finally {
      this.setIsLoading(false);
    }
  }

  @Action({ rawError: true })
  public async getSupplierById(id: number): Promise<ISupplier | boolean> {
    try {
      this.setIsLoading(true);
      const { data } = await axios.get<ISupplier>(`http://localhost:3000/supplier/${id}`);
      this.setSupplierById(data);
      return data;
    } catch (err) {
      return false;
    } finally {
      this.setIsLoading(false);
    }
  }

  @Action({ rawError: true })
  public async insertSupplier(params: ISupplier): Promise<ISupplier | boolean> {
    try {
      this.setIsLoading(true);
      const { data } = await axios.post<ISupplier>('http://localhost:3000/supplier', params);
      this.addSupplier(params);
      return data;
    } catch (err) {
      return false;
    } finally {
      this.setIsLoading(false);
    }
  }

  @Action({ rawError: true })
  public async updateSupplier({
    id,
    params,
  }: {
    id: number;
    params: ISupplier;
  }): Promise<ISupplier | boolean> {
    try {
      this.setIsLoading(true);
      const { data } = await axios.put<ISupplier>(`http://localhost:3000/supplier/${id}`, params);
      this.editSupplier({ id, params });
      return data;
    } catch (err) {
      return false;
    } finally {
      this.setIsLoading(false);
    }
  }

  @Action({ rawError: true })
  public async deleteSupplier(id: number): Promise<ISupplier | boolean> {
    try {
      this.setIsLoading(true);
      const { data } = await axios.delete<ISupplier>(`http://localhost:3000/supplier/${id}`);
      this.removeSupplier(id);
      return data;
    } catch (err) {
      return false;
    } finally {
      this.setIsLoading(false);
    }
  }
}

export default getModule(SupplierModule);
