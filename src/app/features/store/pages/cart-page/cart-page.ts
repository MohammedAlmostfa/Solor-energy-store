
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartQuantityOption } from '../../models/cart-quantity-option.model';
import { CartItem } from '../../models/cart-item.model';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink,AppButtonComponent],
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
      { length: item.product.stock },
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
    const select = event.target;

    if (!(select instanceof HTMLSelectElement)) {
      return;
    }

    const quantity = Number(select.value);

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
