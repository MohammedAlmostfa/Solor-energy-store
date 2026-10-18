
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { CartItem } from '../../models/cart-item.model';
import { CartQuantityOption } from '../../models/cart-quantity-option.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink, AppButtonComponent],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage {
  private readonly cartService = inject(CartService);

  readonly items = this.cartService.items;
  readonly totalItems = this.cartService.totalItems;
  readonly totalPrice = this.cartService.totalPrice;

  getQuantityOptions(item: CartItem): CartQuantityOption[] {
    return Array.from(
      { length: Math.max(0, item.product.stock) },
      (_, index) => {
        const quantity = index + 1;

        return {
          value: quantity,
          label: String(quantity),
        };
      },
    );
  }

  updateQuantity(productId: number, event: Event): void {
    if (!(event.target instanceof HTMLSelectElement)) {
      return;
    }

    const quantity = Number(event.target.value);

    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return;
    }

    this.cartService.updateQuantity(productId, quantity);
  }

  removeProduct(productId: number): void {
    this.cartService.removeProduct(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
