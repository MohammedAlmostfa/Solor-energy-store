import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesService);
  });

  it('provides category options and labels from the same state', () => {
    const added = service.addCategory('Charging controllers');

    expect(added.success).toBe(true);
    if (!added.success) {
      return;
    }

    expect(service.categoryOptions().at(-1)).toEqual({
      value: added.category.id,
      label: 'Charging controllers',
    });
    expect(service.categoryLabels()[added.category.id]).toBe(
      'Charging controllers',
    );
  });

  it('preserves product associations when a category is renamed', () => {
    const updated = service.updateCategory('solar-panel', 'Solar modules');

    expect(updated).toBe(true);
    expect(service.categoryLabels()['solar-panel']).toBe('Solar modules');
    expect(service.categoriesWithCounts().find(
      (category) => category.id === 'solar-panel',
    )?.productCount).toBeGreaterThan(0);
  });

  it('prevents deleting a category assigned to products', () => {
    expect(service.deleteCategory('solar-panel')).toBe('in-use');
    expect(service.allCategories().some(
      (category) => category.id === 'solar-panel',
    )).toBe(true);
  });

  it('prevents deleting a category assigned to an inactive product', () => {
    expect(service.deleteCategory('accessory')).toBe('in-use');
  });

  it('allows deleting an unused category', () => {
    const added = service.addCategory('Temporary category');

    expect(added.success).toBe(true);
    if (!added.success) {
      return;
    }

    expect(service.deleteCategory(added.category.id)).toBe('deleted');
    expect(service.categoryOptions().some(
      (category) => category.value === added.category.id,
    )).toBe(false);
  });
});
