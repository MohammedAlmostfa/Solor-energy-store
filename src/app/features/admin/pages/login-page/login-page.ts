
import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  email = '';
  password = '';

  readonly isPasswordVisible = signal(false);
  readonly errorMessage = signal('');
  readonly isSubmitting = signal(false);

  constructor(private readonly router: Router) {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible.update((visible) => !visible);
  }

  login(): void {
    this.errorMessage.set('');

    const email = this.email.trim().toLowerCase();

    // Demo credentials only. Replace with Laravel API authentication.
    if (
      email !== 'admin@solar.com' ||
      this.password !== 'Admin123!'
    ) {
      this.errorMessage.set(
        'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
      );
      return;
    }

    void this.router.navigate(['/admin']);
  }
}
