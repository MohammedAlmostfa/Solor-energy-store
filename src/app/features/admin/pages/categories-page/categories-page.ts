
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field';
import { trimmedRequiredValidator } from '../../../../shared/validators/trimmed-required.validator';
import { CategoriesService } from '../../../catalog/services/categories';
import {
  DataTableComponent,
  type TableColumn,
} from '../../components/data-table/data-table';
import { DataTableCellTemplateDirective } from '../../components/data-table/data-table-cell-template';
import { StatCardComponent } from '../../components/stat-card/stat-card';
import { AdminPageHeaderComponent } from '../../components/page-header/page-header';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppButtonComponent,
    FormFieldComponent,
    DataTableComponent,
    DataTableCellTemplateDirective,
    StatCardComponent,
    AdminPageHeaderComponent
  ],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPageComponent {
  private readonly categoriesService = inject(CategoriesService);

  readonly categories = this.categoriesService.categoriesWithCounts;
  readonly tableColumns: TableColumn[] = [
    { key: 'name', label: 'اسم التصنيف' },
    { key: 'productCount', label: 'عدد المنتجات' },
    { key: 'actions', label: 'الإجراءات' },
  ];

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly searchTerm = toSignal(this.searchControl.valueChanges, {
    initialValue: this.searchControl.value,
  });
  readonly categoryNameControl = new FormControl('', {
    nonNullable: true,
    validators: [trimmedRequiredValidator(), Validators.maxLength(80)],
  });
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

  clearErrorMessage(): void {
    this.errorMessage.set('');
  }

  startCreate(): void {
    this.editingId.set(null);
    this.categoryNameControl.reset('');
    this.errorMessage.set('');
  }

  startEdit(category: { id: string; name: string }): void {
    this.editingId.set(category.id);
    this.categoryNameControl.setValue(category.name);
    this.errorMessage.set('');
  }

  cancelEdit(): void {
    this.startCreate();
  }

  saveCategory(): void {
    this.categoryNameControl.markAsTouched();

    if (this.categoryNameControl.invalid) {
      return;
    }

    const name = this.categoryNameControl.value.trim();
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
