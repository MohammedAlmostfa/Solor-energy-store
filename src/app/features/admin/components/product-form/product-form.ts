
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '../../../store/models/product.model';

export type ProductFormData = Omit<Product, 'id'>;

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  readonly product = input<Product | null>(null);

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
        : this.createEmptyProduct();
    });
  }

  submitForm(): void {
    this.save.emit({ ...this.formModel });
  }

  private createEmptyProduct(): ProductFormData {
    return {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      category: 'solar-panel',
      powerWatts: 0,
      stock: 0,
      isActive: true,
    };
  }
}
