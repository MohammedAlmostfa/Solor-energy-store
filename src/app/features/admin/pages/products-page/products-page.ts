
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { ProductsService } from '../../../store/services/products';
import {
  Product,
  ProductCategory,
} from '../../../store/models/product.model';

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
    AppButtonComponent,
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

  readonly products = this.productsService.allProducts;

  // Search and filters
  readonly searchTerm = signal('');
  readonly selectedCategory = signal<ProductCategory | 'all'>('all');
  readonly selectedStatus = signal<'all' | 'active' | 'inactive'>('all');

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

  readonly categoryLabels: Record<ProductCategory, string> = {
    'solar-panel': 'ألواح شمسية',
    inverter: 'عاكسات كهربائية',
    battery: 'بطاريات',
    accessory: 'ملحقات',
  };

  // Filtered products
  readonly filteredProducts = computed(() => {
    const search = this.searchTerm().trim().toLocaleLowerCase();
    const category = this.selectedCategory();
    const status = this.selectedStatus();

    return this.products().filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLocaleLowerCase().includes(search) ||
        product.description.toLocaleLowerCase().includes(search);

      const matchesCategory =
        category === 'all' || product.category === category;

      const matchesStatus =
        status === 'all' ||
        (status === 'active' && product.isActive) ||
        (status === 'inactive' && !product.isActive);

      return matchesSearch && matchesCategory && matchesStatus;
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

  // Filter handlers
  updateSearch(value: string): void {
    this.searchTerm.set(value);
  }

  updateCategory(value: string): void {
    this.selectedCategory.set(value as ProductCategory | 'all');
  }

  updateStatus(value: string): void {
    this.selectedStatus.set(value as 'all' | 'active' | 'inactive');
  }

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

