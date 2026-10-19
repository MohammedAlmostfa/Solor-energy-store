
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';

import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field';
import { CategoriesService } from '../../../catalog/services/categories';
import { ProductsService } from '../../../catalog/services/products';
import {
  Product,
  ProductCategory,
} from '../../../catalog/models/product.model';
import { filterProductsBySearchAndCategory } from '../../../catalog/utils/filter-products';

import { DataTableComponent, type TableColumn } from '../../components/data-table/data-table';
import { DataTableCellTemplateDirective } from '../../components/data-table/data-table-cell-template';
import {
  ProductFormComponent,
  type ProductFormData,
} from '../../components/product-form/product-form';
import { StatCardComponent } from '../../components/stat-card/stat-card';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    AppButtonComponent,
    FormFieldComponent,
    StatCardComponent,
    ProductFormComponent,
    DataTableComponent,
    DataTableCellTemplateDirective,
  ],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);

  readonly products = this.productsService.allProducts;
  readonly categories = this.categoriesService.allCategories;

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly categoryControl = new FormControl<ProductCategory | 'all'>(
    'all',
    { nonNullable: true },
  );
  readonly statusControl = new FormControl<'all' | 'active' | 'inactive'>(
    'all',
    { nonNullable: true },
  );
  readonly searchTerm = toSignal(this.searchControl.valueChanges, {
    initialValue: this.searchControl.value,
  });
  readonly selectedCategory = toSignal(this.categoryControl.valueChanges, {
    initialValue: this.categoryControl.value,
  });
  readonly selectedStatus = toSignal(this.statusControl.valueChanges, {
    initialValue: this.statusControl.value,
  });

  // Product form state
  readonly isFormOpen = signal(false);
  readonly editingProduct = signal<Product | null>(null);

  // Table configuration
  readonly tableColumns: TableColumn[] = [
    { key: 'product', label: 'المنتج' },
    { key: 'category', label: 'التصنيف' },
    { key: 'price', label: 'السعر' },
    { key: 'powerWatts', label: 'الاستطاعة' },
    { key: 'stock', label: 'المخزون' },
    { key: 'status', label: 'الحالة' },
    { key: 'actions', label: 'الإجراءات' },
  ];

  readonly categoryLabels = this.categoriesService.categoryLabels;

  // Filtered products
  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const status = this.selectedStatus();

    return filterProductsBySearchAndCategory(
      this.products(),
      this.searchTerm(),
      category,
    ).filter((product) => {
      return (
        status === 'all' ||
        (status === 'active' && product.isActive) ||
        (status === 'inactive' && !product.isActive)
      );
    });
  });

  // Summary statistics
  readonly activeProductsCount = computed(
    () => this.products().filter((product) => product.isActive).length,
  );

  readonly inactiveProductsCount = computed(
    () => this.products().filter((product) => !product.isActive).length,
  );

  readonly totalStock = computed(() =>
    this.products().reduce(
      (total, product) => total + product.stock,
      0,
    ),
  );

  // Form handlers
  openCreateForm(): void {
    this.editingProduct.set(null);
    this.isFormOpen.set(true);
  }

  openEditForm(product: Product): void {
    this.editingProduct.set(product);
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.editingProduct.set(null);
  }

  saveProduct(data: ProductFormData): void {
    const product = this.editingProduct();

    if (product) {
      this.productsService.updateProduct(product.id, data);
    } else {
      this.productsService.addProduct(data);
    }

    this.closeForm();
  }

  // Product actions
  toggleProductStatus(product: Product): void {
    const { id, ...changes } = product;

    this.productsService.updateProduct(id, {
      ...changes,
      isActive: !product.isActive,
    });
  }

  deleteProduct(product: Product): void {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف المنتج "${product.name}"؟`,
    );

    if (confirmed) {
      this.productsService.deleteProduct(product.id);
    }
  }
}
