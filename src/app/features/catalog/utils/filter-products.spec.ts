import { MOCK_PRODUCTS } from '../data/products.data';
import {
  filterProducts,
  filterProductsBySearchAndCategory,
} from './filter-products';

describe('product filters', () => {
  it('matches product names and descriptions with normalized search input', () => {
    const products = filterProductsBySearchAndCategory(
      MOCK_PRODUCTS,
      '  بطارية ',
      'all',
    );

    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) =>
      `${product.name} ${product.description}`.toLocaleLowerCase().includes('بطارية'),
    )).toBe(true);
  });

  it('applies category matching and preserves feature-specific sorting', () => {
    const products = filterProducts({
      products: MOCK_PRODUCTS,
      searchTerm: '',
      category: 'solar-panel',
      sortOption: 'price-asc',
    });

    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.category === 'solar-panel'))
      .toBe(true);
    expect(products.map((product) => product.price)).toEqual(
      [...products.map((product) => product.price)].sort((a, b) => a - b),
    );
  });
});
