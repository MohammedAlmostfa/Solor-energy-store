
import { Product, ProductCategory } from '../models/product.model';

export type SortOption = 'default' | 'price-asc' | 'price-desc';

interface FilterProductsOptions {
  products: Product[];
  searchTerm: string;
  category: ProductCategory | 'all';
  sortOption: SortOption;
}

export function filterProducts({
  products,
  searchTerm,
  category,
  sortOption,
}: FilterProductsOptions): Product[] {
  const term = searchTerm.trim().toLocaleLowerCase();

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLocaleLowerCase().includes(term) ||
      product.description.toLocaleLowerCase().includes(term);

    const matchesCategory =
      category === 'all' || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sortOption === 'price-asc') {
    return [...filtered].sort((a, b) => a.price - b.price);
  }

  if (sortOption === 'price-desc') {
    return [...filtered].sort((a, b) => b.price - a.price);
  }

  return filtered;
}
