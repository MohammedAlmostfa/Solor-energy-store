
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { HomeCategoriesComponent } from './components/components/home-categories/home-categories';
import { AddToCartResult } from '../../models/add-to-cart-result.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_LABELS,
} from '../../utils/product-labels';

import { HomeHeroComponent } from './components/components/home-hero/home-hero';
import { HomeFeaturedComponent } from './components/components/home-featured/home-featured';
import { HomeBenefitsComponent } from './components/components/home-benefits/home-benefits';
import { HomeTestimonialsComponent } from './components/components/home-testimonials/home-testimonials';
import { HomeContactComponent } from './components/components/home-contact/home-contact';

import { CART_FEEDBACK_MESSAGES } from '../../utils/cart-feedback-messages';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeHeroComponent,
    HomeCategoriesComponent,
    HomeFeaturedComponent,
    HomeBenefitsComponent,
    HomeTestimonialsComponent,
    HomeContactComponent,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  readonly products = signal(this.productsService.getProducts());

  readonly featuredProducts = computed(() =>
    this.products()
      .filter((product) => product.isActive)
      .slice(0, 4),
  );

  readonly categories = PRODUCT_CATEGORIES;
  readonly categoryLabels = PRODUCT_CATEGORY_LABELS;

  readonly cartFeedback = signal<string | null>(null);

addToCart(product: Product): void {
  const result = this.cartService.addProduct(product);

  this.cartFeedback.set(CART_FEEDBACK_MESSAGES[result]);
}
}
