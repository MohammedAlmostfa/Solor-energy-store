
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { ProductCategory } from '../../models/product.model';
import { SortOption } from '../../utils/filter-products';

@Component({
  selector: 'app-products-filters',
  standalone: true,
  templateUrl: './products-filters.html',
  styleUrl: './products-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFiltersComponent {
  readonly categories = input.required<
    readonly { value: ProductCategory; label: string }[]
  >();

  readonly searchTerm = input.required<string>();
  readonly selectedCategory = input.required<ProductCategory | 'all'>();
  readonly sortOption = input.required<SortOption>();

  readonly searchTermChange = output<string>();
  readonly categoryChange = output<ProductCategory | 'all'>();
  readonly sortChange = output<SortOption>();


  onSearchInput(event: Event): void {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      this.searchTermChange.emit(input.value);
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
      this.categories().some((category) => category.value === value)
    ) {
      this.categoryChange.emit(value as ProductCategory | 'all');
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
      this.sortChange.emit(value);
    }
  }

}
