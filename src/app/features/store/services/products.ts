
import { Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';
import { MOCK_PRODUCTS } from '../data/products.data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly productsState = signal<Product[]>(
    MOCK_PRODUCTS.map((product) => ({ ...product })),
  );

  readonly allProducts = this.productsState.asReadonly();

  getProducts(): Product[] {
    return this.productsState().filter((product) => product.isActive);
  }

  getAllProducts(): Product[] {
    return this.productsState();
  }

  getProductById(id: number): Product | undefined {
    return this.productsState().find(
      (product) => product.id === id && product.isActive,
    );
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    const products = this.productsState();

    const newProduct: Product = {
      ...product,
      id: products.reduce(
        (maxId, current) => Math.max(maxId, current.id),
        0,
      ) + 1,
    };

    this.productsState.update((current) => [...current, newProduct]);

    return newProduct;
  }

  updateProduct(
    id: number,
    changes: Omit<Product, 'id'>,
  ): boolean {
    const exists = this.productsState().some(
      (product) => product.id === id,
    );

    if (!exists) {
      return false;
    }

    this.productsState.update((products) =>
      products.map((product) =>
        product.id === id ? { ...changes, id } : product,
      ),
    );

    return true;
  }

  deleteProduct(id: number): boolean {
    const products = this.productsState();

    if (!products.some((product) => product.id === id)) {
      return false;
    }

    this.productsState.update((current) =>
      current.filter((product) => product.id !== id),
    );

    return true;
  }
}
