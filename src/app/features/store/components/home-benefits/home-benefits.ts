import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-benefits',
  standalone: true,
  templateUrl: './home-benefits.html',
  styleUrl: './home-benefits.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBenefitsComponent {}
