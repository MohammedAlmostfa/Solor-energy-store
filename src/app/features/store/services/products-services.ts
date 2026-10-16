import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { MOCK_PRODUCTS } from '../data/products.data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getProducts(): Product[] {
    return MOCK_PRODUCTS.filter(
      (product) => product.isActive,
    );
  }

  getProductById(id: number): Product | undefined {
    return this.getProducts().find(
      (product) => product.id === id,
    );
  }
}
