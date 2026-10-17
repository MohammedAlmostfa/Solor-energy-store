import { FormControl } from '@angular/forms';
import { phoneNumberValidator } from './phone-number.validator';

describe('phoneNumberValidator', () => {
  const validator = phoneNumberValidator();

  it('should accept a phone number with country code', () => {
    expect(validator(new FormControl('+963 944 123 456'))).toBeNull();
  });

  it('should accept a phone number with separators', () => {
    expect(validator(new FormControl('(123) 456-7890'))).toBeNull();
  });

  it('should reject letters in a phone number', () => {
    expect(
      validator(new FormControl('123ABC456')),
    ).toEqual({ invalidPhoneNumber: true });
  });

  it('should reject numbers with too few digits', () => {
    expect(
      validator(new FormControl('12345')),
    ).toEqual({ invalidPhoneNumber: true });
  });

  it('should ignore empty values', () => {
    expect(validator(new FormControl(''))).toBeNull();
  });
});
