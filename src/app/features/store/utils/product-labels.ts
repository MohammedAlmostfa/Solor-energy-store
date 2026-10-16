import { ProductCategory } from '../models/product.model';

export const PRODUCT_CATEGORIES = [
  { value: 'solar-panel', label: 'ألواح شمسية' },
  { value: 'inverter', label: 'عاكسات كهربائية' },
  { value: 'battery', label: 'بطاريات' },
  { value: 'accessory', label: 'ملحقات' },
] satisfies {
  value: ProductCategory;
  label: string;
}[];

export const PRODUCT_CATEGORY_LABELS = Object.fromEntries(
  PRODUCT_CATEGORIES.map(({ value, label }) => [value, label]),
) as Record<ProductCategory, string>;
