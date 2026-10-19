
import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

export type StatCardVariant = 'default' | 'warning' | 'danger' | 'success';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly description = input<string>('');
  readonly icon = input.required<string>();
  readonly variant = input<StatCardVariant>('default');
}
