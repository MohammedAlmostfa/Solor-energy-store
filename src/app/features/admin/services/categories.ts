
import { Injectable, computed, inject, signal } from '@angular/core';

import { MOCK_CATEGORIES } from '../data/categories.data';
import { Category } from '../models/category.model';
import { ProductsService } from '../../store/services/products';

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

    const category: Category = {
      id: `category-${Date.now()}`,
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
