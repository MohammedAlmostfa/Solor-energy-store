import { Routes } from '@angular/router';

export const STORE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page').then(
        (m) => m.HomePage,
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products-page/products-page').then(
        (m) => m.ProductsPage,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart-page/cart-page').then(
        (m) => m.CartPage,
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout-page/checkout-page').then(
        (m) => m.CheckoutPage,
      ),
  },
];
