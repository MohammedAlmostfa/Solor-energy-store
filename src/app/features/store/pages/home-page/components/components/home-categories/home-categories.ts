
import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductCategory } from '../../../../../models/product.model';

export interface HomeCategory {
  value: ProductCategory;
  label: string;
}

@Component({
  selector: 'app-home-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-categories.html',
  styleUrl: './home-categories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCategoriesComponent {
  readonly categories = input.required<readonly HomeCategory[]>();
}
