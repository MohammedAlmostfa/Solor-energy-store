
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { HomeCategoriesComponent } from './components/components/home-categories/home-categories';
import { Product } from '../../../catalog/models/product.model';
import { CategoriesService } from '../../../catalog/services/categories';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../../catalog/services/products';

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
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);

  readonly products = this.productsService.activeProducts;

  readonly featuredProducts = computed(() =>
    this.products().slice(0, 4),
  );

  readonly categories = this.categoriesService.categoryOptions;
  readonly categoryLabels = this.categoriesService.categoryLabels;

  readonly cartFeedback = signal<string | null>(null);

  addToCart(product: Product): void {
    const result = this.cartService.addProduct(product);

    this.cartFeedback.set(CART_FEEDBACK_MESSAGES[result]);
  }
}
