
import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field';
import { phoneNumberValidator } from '../../../../shared/validators/phone-number.validator';
import { trimmedRequiredValidator } from '../../../../shared/validators/trimmed-required.validator';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    RouterLink,
    FormFieldComponent,
    AppButtonComponent,
  ],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPage {
  private readonly cartService = inject(CartService);
  private readonly formBuilder = inject(FormBuilder);

  readonly cartItems = this.cartService.items;
  readonly totalItems = this.cartService.totalItems;
  readonly totalPrice = this.cartService.totalPrice;

  readonly checkoutForm = this.formBuilder.nonNullable.group({
    fullName: [
      '',
      [
        trimmedRequiredValidator(),
        Validators.maxLength(100),
      ],
    ],
    phone: [
      '',
      [
        trimmedRequiredValidator(),
        Validators.maxLength(20),
        phoneNumberValidator(),
      ],
    ],
    city: [
      '',
      [
        trimmedRequiredValidator(),
        Validators.maxLength(100),
      ],
    ],
    address: [
      '',
      [
        trimmedRequiredValidator(),
        Validators.maxLength(250),
      ],
    ],
    notes: [
      '',
      [Validators.maxLength(500)],
    ],
  });

  submitted = false;

  submitOrder(): void {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }


  }
}
