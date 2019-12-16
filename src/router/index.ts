import { SupplierRoute } from '@/modules/supplier/router/supplier';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [...SupplierRoute];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
