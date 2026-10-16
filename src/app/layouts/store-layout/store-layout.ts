import { Component } from '@angular/core';
import { RouterLink,  RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-store-layout',
  standalone: true,
  imports: [RouterLink,   RouterLinkActive, RouterOutlet],
  templateUrl: './store-layout.html',
  styleUrl: './store-layout.scss',
})
export class StoreLayout {}
