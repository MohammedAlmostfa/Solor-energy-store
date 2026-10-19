
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard-page/dashboard-page').then(
            (m) => m.DashboardPageComponent,
          ),
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
