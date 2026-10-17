
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { AddToCartResult } from '../../models/add-to-cart-result.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_LABELS,
} from '../../utils/product-labels';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, DecimalPipe, AppButtonComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  readonly products = signal(this.productsService.getProducts());

  readonly featuredProducts = computed(() =>
    this.products().slice(0, 4),
  );

  readonly categories = PRODUCT_CATEGORIES;
  readonly categoryLabels = PRODUCT_CATEGORY_LABELS;

  readonly cartFeedback = signal<string | null>(null);

  getCategoryLabel(category: Product['category']): string {
    return this.categoryLabels[category];
  }

  addToCart(product: Product): void {
    const result = this.cartService.addProduct(product);
    const messages: Record<AddToCartResult, string> = {
      added: 'تمت إضافة المنتج إلى السلة.',
      'out-of-stock': 'هذا المنتج غير متوفر حاليًا.',
      inactive: 'هذا المنتج غير متاح للشراء.',
      'stock-limit-reached': 'وصلت للحد الأقصى المتوفر من هذا المنتج.',
    };

    this.cartFeedback.set(messages[result]);
  }
}
