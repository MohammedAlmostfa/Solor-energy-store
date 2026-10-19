
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field';
import { Category } from '../../../catalog/models/category.model';
import { Product } from '../../../catalog/models/product.model';

export type ProductFormData = Omit<Product, 'id'>;

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, AppButtonComponent, FormFieldComponent],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  readonly product = input<Product | null>(null);
  readonly categories = input.required<readonly Category[]>();

  readonly save = output<ProductFormData>();
  readonly cancel = output<void>();

  formModel: ProductFormData = this.createEmptyProduct();

  constructor() {
    effect(() => {
      const product = this.product();

      this.formModel = product
        ? {
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            powerWatts: product.powerWatts,
            stock: product.stock,
            isActive: product.isActive,
          }
        : this.createEmptyProduct(this.categories()[0]?.id ?? '');
    });
  }

  submitForm(): void {
    this.save.emit({ ...this.formModel });
  }

  private createEmptyProduct(category = ''): ProductFormData {
    return {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      category,
      powerWatts: 0,
      stock: 0,
      isActive: true,
    };
  }
}
