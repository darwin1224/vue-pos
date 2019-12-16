<template>
  <v-app>
    <dashboard>
      <router-view></router-view>
    </dashboard>
    <v-snackbar v-model="snackbar" right bottom>
      <span>{{ snackBarMessage }}</span>
      <v-btn text @click="closeSnackBar">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SnackBar from '@/store/modules/snackbar';
import Dashboard from '@/layout/Dashboard.vue';

@Component({
  name: 'App',
  components: {
    Dashboard,
  },
})
export default class extends Vue {
  private get snackbar(): boolean {
    return SnackBar.isToggle;
  }

  private get snackBarMessage(): string {
    return SnackBar.message;
  }

  private async closeSnackBar(): Promise<void> {
    await SnackBar.close();
  }
}
</script>
