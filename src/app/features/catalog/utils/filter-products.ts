
import { Product, ProductCategory } from '../models/product.model';

export type SortOption = 'default' | 'price-asc' | 'price-desc';

interface FilterProductsOptions {
  products: readonly Product[];
  searchTerm: string;
  category: ProductCategory | 'all';
  sortOption: SortOption;
}

export function filterProductsBySearchAndCategory(
  products: readonly Product[],
  searchTerm: string,
  category: ProductCategory | 'all',
): Product[] {
  const term = searchTerm.trim().toLocaleLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      product.name.toLocaleLowerCase().includes(term) ||
      product.description.toLocaleLowerCase().includes(term);
    const matchesCategory =
      category === 'all' || product.category === category;

    return matchesSearch && matchesCategory;
  });
}

export function filterProducts({
  products,
  searchTerm,
  category,
  sortOption,
}: FilterProductsOptions): Product[] {
  const filtered = filterProductsBySearchAndCategory(
    products,
    searchTerm,
    category,
  );

  if (sortOption === 'price-asc') {
    return [...filtered].sort((a, b) => a.price - b.price);
  }

  if (sortOption === 'price-desc') {
    return [...filtered].sort((a, b) => b.price - a.price);
  }

  return filtered;
}
