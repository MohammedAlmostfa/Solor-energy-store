
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayoutComponent {
  readonly navigationItems = [
    {
      label: 'لوحة التحكم',
      route: '/admin',
      icon: '⌂',
      exact: true,
    },
    {
      label: 'المنتجات',
      route: '/admin/products',
      icon: '▦',
      exact: false,
    },
    {
      label: 'الطلبات',
      route: '/admin/orders',
      icon: '▤',
      exact: false,
    },
    {
      label: 'التصنيفات',
      route: '/admin/categories',
      icon: '▧',
      exact: false,
    },
  ];
}
