
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { AddToCartResult } from '../../models/add-to-cart-result.model';
import { Product, ProductCategory } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products';
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
  imports: [RouterLink, AppButtonComponent],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  // Dependencies
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
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

  readonly cartItemCount = this.cartService.totalItems;
  readonly cartFeedback = signal<string | null>(null);

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const category = params.get('category');
        const selectedCategory = this.categories.find(
          (option) => option.value === category,
        )?.value;

        this.selectedCategory.set(selectedCategory ?? 'all');
      });
  }

  readonly filteredProducts = computed(() =>
    filterProducts({
      products: this.products(),
      searchTerm: this.searchTerm(),
      category: this.selectedCategory(),
      sortOption: this.sortOption(),
    }),
  );

  onSearchInput(event: Event): void {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      this.searchTerm.set(input.value);
    }
  }

  addToCart(product: Product): void {
    const result = this.cartService.addProduct(product);

    const messages: Record<AddToCartResult, string> = {
      added: 'تمت إضافة المنتج إلى السلة.',
      'out-of-stock': 'هذا المنتج غير متوفر حالياً.',
      inactive: 'هذا المنتج غير متاح للشراء.',
      'stock-limit-reached': 'وصلت للحد الأقصى المتوفر من هذا المنتج.',
    };

    this.cartFeedback.set(messages[result]);
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
