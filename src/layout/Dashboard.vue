<template>
  <div>
    <v-navigation-drawer app>
      <v-list dense nav>
        <v-list-group color="brown darken-4" prepend-icon="mdi-view-dashboard" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Supplier</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item :to="{ name: 'SupplierList' }">
            <v-list-item-content>
              <v-list-item-title>Data Supplier</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'SupplierCreate' }">
            <v-list-item-content>
              <v-list-item-title>Form Supplier</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="brown darken-4" dark app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>POS</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Dashboard',
})
export default class extends Vue {}
</script>
