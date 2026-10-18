import { Routes } from '@angular/router';

import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        component: DashboardPageComponent,
      },
      {
  path: 'products',
  loadComponent: () =>
    import('./pages/products-page/products-page').then(
      (m) => m.ProductsPageComponent,
    ),
},

{
  path: 'orders',
  loadComponent: () =>
    import('./pages/orders-page/orders-page').then(
      (m) => m.OrdersPageComponent,
    ),
},

{
  path: 'categories',
  loadComponent: () =>
    import('./pages/categories-page/categories-page').then(
      (m) => m.CategoriesPageComponent,
    ),
},

    ],
  },
];
