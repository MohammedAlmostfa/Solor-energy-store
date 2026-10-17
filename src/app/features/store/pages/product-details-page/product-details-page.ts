import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { ProductsService } from '../../services/products';
import { PRODUCT_CATEGORY_LABELS } from '../../utils/product-labels';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
private readonly cartService = inject(CartService);

  readonly categoryLabels = PRODUCT_CATEGORY_LABELS;

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

  this.cartService.addProduct(product);
}
}
