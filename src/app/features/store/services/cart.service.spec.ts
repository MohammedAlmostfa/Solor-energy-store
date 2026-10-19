import { TestBed } from '@angular/core/testing';

import { ProductsService } from '../../catalog/services/products';
import { CartService } from './cart.service';

describe('CartService', () => {
  let cartService: CartService;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    productsService = TestBed.inject(ProductsService);
    cartService = TestBed.inject(CartService);
  });

  it('keeps the price captured when the product is first added', () => {
    const product = productsService.allProducts()[0];
    cartService.addProduct(product);

    productsService.updateProduct(product.id, {
      ...product,
      price: product.price + 25,
    });

    expect(cartService.items()[0].unitPrice).toBe(product.price);
    expect(cartService.items()[0].product.price).toBe(product.price + 25);
    expect(cartService.totalPrice()).toBe(product.price);
  });

  it('flags stock reductions and allows resolving them by reducing quantity', () => {
    const product = productsService.allProducts()[0];
    cartService.addProduct(product);
    cartService.addProduct(product);

    productsService.updateProduct(product.id, {
      ...product,
      stock: 1,
    });

    expect(cartService.items()[0].quantity).toBe(2);
    expect(cartService.items()[0].currentStock).toBe(1);
    expect(cartService.canCheckout()).toBe(false);

    cartService.updateQuantity(product.id, 1);

    expect(cartService.items()[0].quantity).toBe(1);
    expect(cartService.canCheckout()).toBe(true);
  });

  it('blocks checkout for inactive or deleted products without silently changing the cart', () => {
    const product = productsService.allProducts()[0];
    cartService.addProduct(product);

    productsService.updateProduct(product.id, {
      ...product,
      isActive: false,
    });

    expect(cartService.items()[0].quantity).toBe(1);
    expect(cartService.items()[0].isActive).toBe(false);
    expect(cartService.canCheckout()).toBe(false);

    productsService.deleteProduct(product.id);

    expect(cartService.items()[0].productExists).toBe(false);
    expect(cartService.canCheckout()).toBe(false);
  });
});
