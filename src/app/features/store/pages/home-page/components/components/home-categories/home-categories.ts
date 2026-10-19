
import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { CategoryOption } from '../../../../../../catalog/models/category.model';

@Component({
  selector: 'app-home-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-categories.html',
  styleUrl: './home-categories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCategoriesComponent {
  readonly categories = input.required<readonly CategoryOption[]>();
}
