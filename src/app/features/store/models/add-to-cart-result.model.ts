export type AddToCartResult =
  | 'added'
  | 'out-of-stock'
  | 'inactive'
  | 'stock-limit-reached';
