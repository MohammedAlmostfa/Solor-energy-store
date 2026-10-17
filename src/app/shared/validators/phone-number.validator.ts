import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: unknown = control.value;

    if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
    }

    const normalizedValue = value.trim();
    const allowedCharacters = /^\+?[0-9\s()-]+$/;
    const digitCount = normalizedValue.replace(/\D/g, '').length;

    if (
      !allowedCharacters.test(normalizedValue) ||
      digitCount < 7 ||
      digitCount > 15
    ) {
      return { invalidPhoneNumber: true };
    }

    return null;
  };
}
