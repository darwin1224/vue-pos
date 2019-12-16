<template>
  <div>
    <v-row>
      <v-col cols="5">
        <v-skeleton-loader
          type="list-item-avatar, article, actions"
          v-if="isLoading"
        ></v-skeleton-loader>
        <v-card v-else>
          <v-form @submit.prevent="onSubmit" ref="form" v-model="isValid">
            <v-card-title>{{ formName }} Supplier</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="supplierBody.name"
                label="Title"
                :counter="10"
                :rules="nameRules"
                color="brown darken-4"
                clearable
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="{ name: 'SupplierList' }">Cancel</v-btn>
              <v-btn type="submit" color="brown darken-4" dark>{{ buttonSubmitName }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Supplier from '@/modules/supplier/store/supplier';
import SnackBar from '@/store/modules/snackbar';
import { ISupplier } from '@typings/models';

@Component({
  name: 'SupplierForm',
})
export default class extends Vue {
  private supplierBody: ISupplier = {
    name: '',
  };

  private isValid: boolean = true;

  private nameRules: ((v: any) => void)[] = [
    (v: any) => !!v || 'Name is required',
    (v: any) => (v && v.length <= 10) || 'Name can only have 10 maximum characters',
  ];

  private get isLoading(): boolean {
    return Supplier.isLoading;
  }

  private get formName(): string {
    return /edit/g.test(this.$route.path) ? 'Update' : 'Insert';
  }

  private get buttonSubmitName(): string {
    return /edit/g.test(this.$route.path) ? 'Update' : 'Save';
  }

  public async created(): Promise<void> {
    return await this.getById();
  }

  private async getById(): Promise<void> {
    if (/edit/g.test(this.$route.path)) {
      const data = (await Supplier.getSupplierById(Number(this.$route.params.id))) as any;
      for (const body in this.supplierBody) {
        (this.supplierBody as any)[body] = data[body];
      }
    }
  }

  private async onSubmit(): Promise<void> {
    if ((this.$refs.form as any).validate()) {
      if (!/edit/g.test(this.$route.path)) {
        await Supplier.insertSupplier({ ...this.supplierBody });
        await SnackBar.open('Data has been saved');
      } else {
        await Supplier.updateSupplier({
          id: Number(this.$route.params.id),
          params: { ...this.supplierBody },
        });
        await SnackBar.open('Data has been updated');
      }
      await this.$router.push({ name: 'SupplierList' });
    }
  }
}
</script>
