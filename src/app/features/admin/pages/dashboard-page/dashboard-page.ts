
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CategoriesService } from '../../../catalog/services/categories';
import { ProductsService } from '../../../catalog/services/products';
import { Product } from '../../../catalog/models/product.model';

import {
  DataTableComponent,
  type TableColumn,
} from '../../components/data-table/data-table';
import { DataTableCellTemplateDirective } from
  '../../components/data-table/data-table-cell-template';
import { StatCardComponent } from '../../components/stat-card/stat-card';
import { OrdersService } from '../../services/orders';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    DecimalPipe,
    DataTableComponent,
    DataTableCellTemplateDirective,
    StatCardComponent,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly ordersService = inject(OrdersService);

  readonly products = this.productsService.activeProducts;
  readonly orders = this.ordersService.allOrders;

  readonly totalProducts = computed(() => this.products().length);
  readonly totalOrders = computed(() => this.orders().length);
  readonly pendingOrders = computed(
    () => this.orders().filter((order) => order.status === 'pending').length,
  );
  readonly completedOrders = computed(
    () => this.orders().filter((order) => order.status === 'completed').length,
  );

  readonly inventoryColumns: TableColumn[] = [
    { key: 'product', label: 'المنتج' },
    { key: 'category', label: 'التصنيف' },
    { key: 'price', label: 'السعر' },
    { key: 'stock', label: 'الكمية المتبقية' },
    { key: 'status', label: 'الحالة' },
  ];

  readonly categoryLabels = this.categoriesService.categoryLabels;
  readonly inventorySearchTerm = signal('');

  readonly lowStockProducts = computed(() =>
    this.products().filter(
      (product) => product.stock > 0 && product.stock <= 5,
    ),
  );

  readonly filteredLowStockProducts = computed(() => {
    const search = this.inventorySearchTerm().trim().toLocaleLowerCase();

    return this.lowStockProducts().filter((product) => {
      const category = this.categoryLabels()[product.category] ?? '';
      return (
        product.name.toLocaleLowerCase().includes(search) ||
        category.toLocaleLowerCase().includes(search)
      );
    });
  });

  updateInventorySearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.inventorySearchTerm.set(event.target.value);
    }
  }
}
