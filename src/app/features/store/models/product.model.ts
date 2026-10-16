export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  powerWatts: number;
  stock: number;
  isActive: boolean;
}

export type ProductCategory =
  | 'solar-panel'
  | 'inverter'
  | 'battery'
  | 'accessory';
