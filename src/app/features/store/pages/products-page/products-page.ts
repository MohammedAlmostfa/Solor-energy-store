
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { Product, ProductCategory } from '../../models/product.model';
import { ProductsService } from '../../services/products-services';
import { RouterLink } from '@angular/router';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_LABELS,
} from '../../utils/product-labels';

import {
  filterProducts,
  SortOption,
} from '../../utils/filter-products';

@Component({
  selector: 'app-products-page',
  standalone: true,
imports: [RouterLink],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  // Dependencies
  private readonly productsService = inject(ProductsService);

  // Static data
  readonly categories = PRODUCT_CATEGORIES;
  readonly categoryLabels = PRODUCT_CATEGORY_LABELS;

  // State
  readonly products = signal<Product[]>(
    this.productsService.getProducts(),
  );

  readonly searchTerm = signal('');
  readonly selectedCategory = signal<ProductCategory | 'all'>('all');
  readonly sortOption = signal<SortOption>('default');

  // Derived state
  readonly filteredProducts = computed(() =>
    filterProducts({
      products: this.products(),
      searchTerm: this.searchTerm(),
      category: this.selectedCategory(),
      sortOption: this.sortOption(),
    }),
  );

  // Event handlers
  onSearchInput(event: Event): void {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      this.searchTerm.set(input.value);
    }
  }

  onCategoryChange(event: Event): void {
    const select = event.target;

    if (!(select instanceof HTMLSelectElement)) {
      return;
    }

    const value = select.value;

    if (
      value === 'all' ||
      this.categories.some((category) => category.value === value)
    ) {
      this.selectedCategory.set(value as ProductCategory | 'all');
    }
  }

  onSortChange(event: Event): void {
    const select = event.target;

    if (!(select instanceof HTMLSelectElement)) {
      return;
    }

    const value = select.value;

    if (
      value === 'default' ||
      value === 'price-asc' ||
      value === 'price-desc'
    ) {
      this.sortOption.set(value);
    }
  }
}
