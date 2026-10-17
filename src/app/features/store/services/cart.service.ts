
import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { AddToCartResult } from '../models/add-to-cart-result.model';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsState = signal<CartItem[]>([]);

  readonly items = this.itemsState.asReadonly();

  readonly totalItems = computed(() =>
    this.itemsState().reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );

  readonly totalPrice = computed(() =>
    this.itemsState().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
  );

 addProduct(product: Product): AddToCartResult {
  if (!product.isActive) {
    return 'inactive';
  }

  if (product.stock <= 0) {
    return 'out-of-stock';
  }

  const existingItem = this.itemsState().find(
    (item) => item.product.id === product.id,
  );

  if (existingItem && existingItem.quantity >= product.stock) {
    return 'stock-limit-reached';
  }

  this.itemsState.update((items) => {
    const currentItem = items.find(
      (item) => item.product.id === product.id,
    );

    if (currentItem) {
      return items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }

    return [...items, { product, quantity: 1 }];
  });

  return 'added';
}

  updateQuantity(productId: number, quantity: number): void {
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return;
    }

    this.itemsState.update((items) =>
      items.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(quantity, item.product.stock),
            }
          : item,
      ),
    );
  }

  removeProduct(productId: number): void {
    this.itemsState.update((items) =>
      items.filter((item) => item.product.id !== productId),
    );
  }

  clearCart(): void {
    this.itemsState.set([]);
  }
}
