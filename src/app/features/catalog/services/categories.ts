
import { Injectable, computed, inject, signal } from '@angular/core';

import { MOCK_CATEGORIES } from '../data/categories.data';
import { Category, CategoryOption } from '../models/category.model';
import { ProductsService } from './products';

export type AddCategoryResult =
  | { success: true; category: Category }
  | { success: false; reason: 'duplicate' };

export type DeleteCategoryResult =
  | 'deleted'
  | 'in-use'
  | 'not-found';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly productsService = inject(ProductsService);

  private readonly categoriesState = signal<Category[]>(
    MOCK_CATEGORIES.map((category) => ({ ...category })),
  );

  readonly allCategories = this.categoriesState.asReadonly();

  readonly categoryOptions = computed<CategoryOption[]>(() =>
    this.categoriesState().map((category) => ({
      value: category.id,
      label: category.name,
    })),
  );

  readonly categoryLabels = computed(() => {
    const labels: Record<string, string> = {};

    for (const { id, name } of this.categoriesState()) {
      labels[id] = name;
    }

    return labels;
  });

  readonly categoriesWithCounts = computed(() => {
    const products = this.productsService.allProducts();

    return this.categoriesState().map((category) => ({
      ...category,
      productCount: products.filter(
        (product) => product.category === category.id,
      ).length,
    }));
  });

  addCategory(name: string): AddCategoryResult {
    const normalizedName = name.trim();

    const duplicate = this.categoriesState().some(
      (category) =>
        category.name.toLocaleLowerCase() ===
        normalizedName.toLocaleLowerCase(),
    );

    if (!normalizedName || duplicate) {
      return { success: false, reason: 'duplicate' };
    }

    let id = `category-${Date.now()}`;
    let suffix = 1;
    while (this.categoriesState().some((category) => category.id === id)) {
      id = `category-${Date.now()}-${suffix}`;
      suffix += 1;
    }

    const category: Category = {
      id,
      name: normalizedName,
    };

    this.categoriesState.update((categories) => [
      ...categories,
      category,
    ]);

    return { success: true, category };
  }

  updateCategory(id: string, name: string): boolean {
    const normalizedName = name.trim();

    if (!normalizedName) {
      return false;
    }

    const categories = this.categoriesState();
    const exists = categories.some((category) => category.id === id);
    const duplicate = categories.some(
      (category) =>
        category.id !== id &&
        category.name.toLocaleLowerCase() ===
          normalizedName.toLocaleLowerCase(),
    );

    if (!exists || duplicate) {
      return false;
    }

    this.categoriesState.update((current) =>
      current.map((category) =>
        category.id === id
          ? { ...category, name: normalizedName }
          : category,
      ),
    );

    return true;
  }

  deleteCategory(id: string): DeleteCategoryResult {
    const exists = this.categoriesState().some(
      (category) => category.id === id,
    );

    if (!exists) {
      return 'not-found';
    }

    const isInUse = this.productsService.allProducts().some(
      (product) => product.category === id,
    );

    if (isInUse) {
      return 'in-use';
    }

    this.categoriesState.update((categories) =>
      categories.filter((category) => category.id !== id),
    );

    return 'deleted';
  }
}
