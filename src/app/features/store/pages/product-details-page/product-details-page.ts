
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AddToCartResult } from '../../models/add-to-cart-result.model';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products';
import { PRODUCT_CATEGORY_LABELS } from '../../utils/product-labels';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
@Component({
  selector: 'app-product-details-page',
  standalone: true,
imports: [
  RouterLink,
  AppButtonComponent,
],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  readonly categoryLabels = PRODUCT_CATEGORY_LABELS;
  readonly cartFeedback = signal<string | null>(null);

  private readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly product = computed(() => {
    const id = Number(this.routeParams().get('id'));

    if (!Number.isSafeInteger(id) || id <= 0) {
      return undefined;
    }

    return this.productsService.getProductById(id);
  });

  addToCart(): void {
    const product = this.product();

    if (!product) {
      return;
    }

    const result = this.cartService.addProduct(product);

    const messages: Record<AddToCartResult, string> = {
      added: 'تمت إضافة المنتج إلى السلة.',
      'out-of-stock': 'هذا المنتج غير متوفر حالياً.',
      inactive: 'هذا المنتج غير متاح للشراء.',
      'stock-limit-reached': 'وصلت للحد الأقصى المتوفر من هذا المنتج.',
    };

    this.cartFeedback.set(messages[result]);
  }
}
