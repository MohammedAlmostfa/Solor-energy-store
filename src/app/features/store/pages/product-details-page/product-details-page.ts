
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CategoriesService } from '../../../catalog/services/categories';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../../catalog/services/products';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { CART_FEEDBACK_MESSAGES } from '../../utils/cart-feedback-messages';
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
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);

  readonly categoryLabels = this.categoriesService.categoryLabels;
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
    this.cartFeedback.set(CART_FEEDBACK_MESSAGES[result]);
  }
}
