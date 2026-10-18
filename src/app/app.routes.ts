import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/store-layout/store-layout').then(
        (m) => m.StoreLayout,
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/store/store.routes').then(
            (m) => m.STORE_ROUTES,
          ),
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/admin/admin.routes').then(
            (m) => m.ADMIN_ROUTES,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
