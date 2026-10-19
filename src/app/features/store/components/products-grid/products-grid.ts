
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { Product } from '../../../catalog/models/product.model';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsGridComponent {
  readonly products = input.required<Product[]>();
  readonly categoryLabels = input.required<
    Record<Product['category'], string>
  >();

  readonly addToCart = output<Product>();
}
