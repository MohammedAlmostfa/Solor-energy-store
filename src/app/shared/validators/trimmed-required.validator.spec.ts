import { FormControl } from '@angular/forms';
import { trimmedRequiredValidator } from './trimmed-required.validator';

describe('trimmedRequiredValidator', () => {
  const validator = trimmedRequiredValidator();

  it('should reject an empty value', () => {
    expect(validator(new FormControl(''))).toEqual({
      required: true,
    });
  });

  it('should reject whitespace-only values', () => {
    expect(validator(new FormControl('   '))).toEqual({
      required: true,
    });
  });

  it('should accept a non-empty value', () => {
    expect(validator(new FormControl('محمد'))).toBeNull();
  });
});
