import { RouteConfig } from 'vue-router';

export const SupplierRoute: RouteConfig[] = [
  {
    path: '/',
    name: 'SupplierList',
    component: () =>
      import(/* webpackChunkName: "SupplierList" */ '@/modules/supplier/pages/index.vue'),
  },
  {
    path: '/supplier/create',
    name: 'SupplierCreate',
    component: () =>
      import(/* webpackChunkName: "SupplierCreate" */ '@/modules/supplier/pages/form.vue'),
  },
  {
    path: '/supplier/:id/edit',
    name: 'SupplierEdit',
    component: () =>
      import(/* webpackChunkName: "SupplierEdit" */ '@/modules/supplier/pages/form.vue'),
  },
];
