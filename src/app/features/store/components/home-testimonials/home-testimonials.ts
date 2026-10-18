import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  templateUrl: './home-testimonials.html',
  styleUrl: './home-testimonials.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTestimonialsComponent {}
