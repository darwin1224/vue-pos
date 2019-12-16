<template>
  <div>
    <v-skeleton-loader type="table" v-if="isLoading"></v-skeleton-loader>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="suppliers"
      :items-per-page="10"
      class="elevation-2"
      v-else
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-btn color="brown darken-4" dark :to="{ name: 'SupplierCreate' }">Add Supplier</v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search..."
            append-icon="mdi-magnify"
            color="brown darken-4"
            hide-details
            clearable
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon :to="{ name: 'SupplierEdit', params: { id: item.id } }">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="openDialog(item.id)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title>Warning!</v-card-title>
        <v-card-text>Are you sure you want to delete this data?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn text color="red accent-4" :loading="isLoading" @click="onDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Supplier from '@/modules/supplier/store/supplier';
import SnackBar from '@/store/modules/snackbar';
import Modal from '@/store/modules/modal';
import { ISupplier } from '@typings/models';

@Component({
  name: 'SupplierList',
})
export default class extends Vue {
  private headers: { text: string; value: string; sortable?: boolean }[] = [
    { text: 'No.', value: 'id' },
    { text: 'Name', value: 'name' },
    { text: 'Actions', value: 'actions', sortable: false },
  ];

  private search: string = '';

  private get dialog(): boolean {
    return Modal.isToggle;
  }

  private get suppliers(): ISupplier[] {
    return Supplier.data;
  }

  private get isLoading(): boolean {
    return Supplier.isLoading;
  }

  public async created(): Promise<ISupplier[] | boolean> {
    return await this.getAll();
  }

  private async getAll(): Promise<ISupplier[] | boolean> {
    return await Supplier.getAllSupplier();
  }

  private async openDialog(id: number): Promise<void> {
    await Modal.setToggle(true);
    await Modal.setData(id);
  }

  private async closeDialog(): Promise<void> {
    await Modal.setToggle(false);
  }

  private async onDelete(): Promise<void> {
    await Supplier.deleteSupplier(Modal.data);
    await Modal.setToggle(false);
    await SnackBar.open('Data has been deleted');
  }
}
</script>
