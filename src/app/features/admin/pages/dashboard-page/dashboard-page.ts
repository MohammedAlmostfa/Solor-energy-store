
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ProductsService } from '../../../store/services/products';
import { Product } from '../../../store/models/product.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private readonly productsService = inject(ProductsService);

  readonly products = signal<Product[]>(this.productsService.getProducts());

  readonly totalProducts = computed(() => this.products().length);

  readonly totalStock = computed(() =>
    this.products().reduce((total, product) => total + product.stock, 0),
  );

  readonly lowStockProducts = computed(() =>
    this.products().filter(
      (product) => product.stock > 0 && product.stock <= 5,
    ),
  );

  readonly outOfStockProducts = computed(() =>
    this.products().filter((product) => product.stock === 0),
  );

  readonly inventoryValue = computed(() =>
    this.products().reduce(
      (total, product) => total + product.price * product.stock,
      0,
    ),
  );

  readonly lowStockCount = computed(() => this.lowStockProducts().length);
}
