import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  templateUrl: './home-contact.html',
  styleUrl: './home-contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContactComponent {}
