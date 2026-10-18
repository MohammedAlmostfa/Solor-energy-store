
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { ProductsFiltersComponent } from '../../components/products-filters/products-filters';
import { ProductsGridComponent } from '../../components/products-grid/products-grid';
import { AddToCartResult } from '../../models/add-to-cart-result.model';
import { Product, ProductCategory } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products';
import { CART_FEEDBACK_MESSAGES } from '../../utils/cart-feedback-messages';
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
  imports: [
    ProductsFiltersComponent,
    ProductsGridComponent,
  ],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = PRODUCT_CATEGORIES;
  readonly categoryLabels = PRODUCT_CATEGORY_LABELS;

  readonly products = signal<Product[]>(
    this.productsService.getProducts(),
  );

  readonly searchTerm = signal('');
  readonly selectedCategory = signal<ProductCategory | 'all'>('all');
  readonly sortOption = signal<SortOption>('default');

  readonly cartItemCount = this.cartService.totalItems;
  readonly cartFeedback = signal<string | null>(null);

  readonly filteredProducts = computed(() =>
    filterProducts({
      products: this.products(),
      searchTerm: this.searchTerm(),
      category: this.selectedCategory(),
      sortOption: this.sortOption(),
    }),
  );

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

  addToCart(product: Product): void {
  const result = this.cartService.addProduct(product);

  this.cartFeedback.set(CART_FEEDBACK_MESSAGES[result]);
}
}
