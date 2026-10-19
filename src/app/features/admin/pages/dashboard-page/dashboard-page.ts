
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductsService } from '../../../store/services/products';
import {
  Product,
  ProductCategory,
} from '../../../store/models/product.model';

import { StatCardComponent } from '../../components/stat-card/stat-card';
import {
  DataTableComponent,
  type TableColumn,
} from '../../components/data-table/data-table';
import { DataTableCellTemplateDirective } from
  '../../components/data-table/data-table-cell-template';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    StatCardComponent,
    DataTableComponent,
    DataTableCellTemplateDirective,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private readonly productsService = inject(ProductsService);

  readonly products = signal<Product[]>(
    this.productsService.getProducts(),
  );

  readonly inventoryColumns: TableColumn[] = [
    { key: 'product', label: 'المنتج' },
    { key: 'category', label: 'التصنيف' },
    { key: 'price', label: 'السعر' },
    { key: 'stock', label: 'الكمية المتبقية' },
    { key: 'status', label: 'الحالة' },
  ];

  readonly categoryLabels: Record<ProductCategory, string> = {
    'solar-panel': 'ألواح شمسية',
    inverter: 'عاكسات كهربائية',
    battery: 'بطاريات',
    accessory: 'ملحقات',
  };

  readonly totalProducts = computed(
    () => this.products().length,
  );

  readonly totalStock = computed(() =>
    this.products().reduce(
      (total, product) => total + product.stock,
      0,
    ),
  );

  readonly lowStockProducts = computed(() =>
    this.products().filter(
      (product) => product.stock > 0 && product.stock <= 5,
    ),
  );

  readonly lowStockCount = computed(
    () => this.lowStockProducts().length,
  );

  readonly outOfStockProducts = computed(() =>
    this.products().filter(
      (product) => product.stock === 0,
    ),
  );

  readonly inventoryValue = computed(() =>
    this.products().reduce(
      (total, product) => total + product.price * product.stock,
      0,
    ),
  );
}

