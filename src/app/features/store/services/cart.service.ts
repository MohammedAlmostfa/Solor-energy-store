
import { Injectable, computed, inject, signal } from '@angular/core';

import type { Product } from '../../catalog/models/product.model';
import type { AddToCartResult } from '../models/add-to-cart-result.model';
import type { CartItem, CartItemView } from '../models/cart-item.model';
import { ProductsService } from '../../catalog/services/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly productsService = inject(ProductsService);
  private readonly itemsState = signal<CartItem[]>([]);

  readonly items = computed<CartItemView[]>(() => {
    const productsById = new Map<number, Product>(
      this.productsService
        .allProducts()
        .map((product) => [product.id, product]),
    );

    return this.itemsState().map((item) => {
      const currentProduct = productsById.get(item.product.id);

      return {
        ...item,
        product: currentProduct ?? item.product,
        currentStock: currentProduct?.stock ?? 0,
        productExists: currentProduct !== undefined,
        isActive: currentProduct?.isActive ?? false,
      };
    });
  });

  readonly totalItems = computed(() =>
    this.itemsState().reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );

  readonly totalPrice = computed(() =>
    this.itemsState().reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    ),
  );

  readonly canCheckout = computed(() =>
    this.items().every(
      (item) =>
        item.productExists &&
        item.isActive &&
        item.currentStock >= item.quantity,
    ),
  );

  addProduct(product: Product): AddToCartResult {
    const currentProduct = this.productsService
      .allProducts()
      .find((current) => current.id === product.id);

    if (!currentProduct || !currentProduct.isActive) {
      return 'inactive';
    }

    if (currentProduct.stock <= 0) {
      return 'out-of-stock';
    }

    const existingItem = this.itemsState().find(
      (item) => item.product.id === product.id,
    );

    if (existingItem && existingItem.quantity >= currentProduct.stock) {
      return 'stock-limit-reached';
    }

    this.itemsState.update((items) => {
      const currentItem = items.find(
        (item) => item.product.id === currentProduct.id,
      );

      if (currentItem) {
        return items.map((item) =>
          item.product.id === currentProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...items,
        {
          product: currentProduct,
          quantity: 1,
          unitPrice: currentProduct.price,
        },
      ];
    });

    return 'added';
  }

  updateQuantity(productId: number, quantity: number): void {
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return;
    }

    const product = this.productsService
      .allProducts()
      .find((current) => current.id === productId);

    if (!product || quantity > product.stock) {
      return;
    }

    this.itemsState.update((items) =>
      items.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
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
