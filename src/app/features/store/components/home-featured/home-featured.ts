
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsGridComponent } from '../../components/products-grid/products-grid';

@Component({
  selector: 'app-home-featured',
  standalone: true,
  imports: [RouterLink, ProductsGridComponent],
  templateUrl: './home-featured.html',
  styleUrl: './home-featured.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeaturedComponent {
  readonly products = input.required<Product[]>();

  readonly categoryLabels =
    input.required<Record<Product['category'], string>>();

  readonly cartFeedback = input<string | null>(null);

  readonly productAdded = output<Product>();
}
