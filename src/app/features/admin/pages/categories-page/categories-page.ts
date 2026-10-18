
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoriesService } from '../../services/categories';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPageComponent {
  private readonly categoriesService = inject(CategoriesService);

  readonly categories = this.categoriesService.categoriesWithCounts;

  readonly searchTerm = signal('');
  readonly categoryName = signal('');
  readonly editingId = signal<string | null>(null);
  readonly errorMessage = signal('');

  readonly filteredCategories = computed(() => {
    const search = this.searchTerm().trim().toLocaleLowerCase();

    return this.categories().filter((category) =>
      category.name.toLocaleLowerCase().includes(search),
    );
  });

  readonly totalCategories = computed(
    () => this.categories().length,
  );

  readonly totalAssignedProducts = computed(
    () => this.categories().reduce(
      (total, category) => total + category.productCount,
      0,
    ),
  );

  updateSearch(value: string): void {
    this.searchTerm.set(value);
  }

  updateCategoryName(value: string): void {
    this.categoryName.set(value);
    this.errorMessage.set('');
  }

  startCreate(): void {
    this.editingId.set(null);
    this.categoryName.set('');
    this.errorMessage.set('');
  }

  startEdit(category: { id: string; name: string }): void {
    this.editingId.set(category.id);
    this.categoryName.set(category.name);
    this.errorMessage.set('');
  }

  cancelEdit(): void {
    this.startCreate();
  }

  saveCategory(): void {
    const name = this.categoryName().trim();

    if (!name) {
      this.errorMessage.set('يرجى إدخال اسم التصنيف.');
      return;
    }

    const editingId = this.editingId();

    if (editingId) {
      const updated = this.categoriesService.updateCategory(
        editingId,
        name,
      );

      if (!updated) {
        this.errorMessage.set(
          'تعذر تعديل التصنيف. قد يكون الاسم مستخدماً.',
        );
        return;
      }
    } else {
      const result = this.categoriesService.addCategory(name);

      if (!result.success) {
        this.errorMessage.set(
          'اسم التصنيف فارغ أو موجود مسبقاً.',
        );
        return;
      }
    }

    this.startCreate();
  }

  deleteCategory(category: { id: string; name: string }): void {
    const confirmed = window.confirm(
      `هل تريد حذف التصنيف "${category.name}"؟`,
    );

    if (!confirmed) {
      return;
    }

    const result = this.categoriesService.deleteCategory(category.id);

    if (result === 'in-use') {
      this.errorMessage.set(
        'لا يمكن حذف هذا التصنيف لأنه مرتبط بمنتج واحد أو أكثر.',
      );
    } else if (result === 'not-found') {
      this.errorMessage.set('التصنيف غير موجود.');
    } else {
      this.errorMessage.set('');
    }
  }
}
