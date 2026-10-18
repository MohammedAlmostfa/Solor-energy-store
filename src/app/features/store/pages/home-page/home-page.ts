
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { HomeCategoriesComponent } from '../../components/home-categories/home-categories';
import { AddToCartResult } from '../../models/add-to-cart-result.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_LABELS,
} from '../../utils/product-labels';

import { HomeHeroComponent } from '../../components/home-hero/home-hero';
import { HomeFeaturedComponent } from '../../components/home-featured/home-featured';
import { HomeBenefitsComponent } from '../../components/home-benefits/home-benefits';
import { HomeTestimonialsComponent } from '../../components/home-testimonials/home-testimonials';
import { HomeContactComponent } from '../../components/home-contact/home-contact';

const CART_FEEDBACK_MESSAGES: Record<AddToCartResult, string> = {
  added: 'تمت إضافة المنتج إلى السلة.',
  'out-of-stock': 'هذا المنتج غير متوفر حاليًا.',
  inactive: 'هذا المنتج غير متاح للشراء.',
  'stock-limit-reached': 'وصلت للحد الأقصى المتوفر من هذا المنتج.',
};

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
