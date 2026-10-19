import { TestBed } from '@angular/core/testing';

import { MOCK_PRODUCTS } from '../data/products.data';
import { ProductsService } from './products';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updates active product projections when a product changes', () => {
    const inactiveProduct = MOCK_PRODUCTS.find((product) => !product.isActive);
    expect(inactiveProduct).toBeDefined();
    if (!inactiveProduct) {
      return;
    }

    expect(service.activeProducts().some(
      (product) => product.id === inactiveProduct.id,
    )).toBe(false);

    const { id, ...changes } = inactiveProduct;
    service.updateProduct(id, { ...changes, isActive: true });

    expect(service.activeProducts().some(
      (product) => product.id === inactiveProduct.id,
    )).toBe(true);
  });
});
