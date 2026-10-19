import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CartService } from '../../features/store/services/cart.service';

@Component({
  selector: 'app-store-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './store-layout.html',
  styleUrl: './store-layout.scss',
})
export class StoreLayout {
  private readonly cartService = inject(CartService);

  readonly cartItemCount = this.cartService.totalItems;
}
