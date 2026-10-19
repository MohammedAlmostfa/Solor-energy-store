import { Product } from '../../catalog/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  /** The unit price is captured when the product is first added to the cart. */
  unitPrice: number;
}

export interface CartItemView extends CartItem {
  product: Product;
  currentStock: number;
  productExists: boolean;
  isActive: boolean;
}
