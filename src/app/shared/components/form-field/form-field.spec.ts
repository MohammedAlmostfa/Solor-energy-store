import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { FormFieldComponent } from './form-field';

describe('FormFieldComponent', () => {
  let fixture: ComponentFixture<FormFieldComponent>;
  let control: FormControl<string>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent],
    }).compileComponents();

    control = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    });

    fixture = TestBed.createComponent(FormFieldComponent);
    fixture.componentRef.setInput('label', 'Name');
    fixture.componentRef.setInput('inputId', 'name');
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('errors', [
      { key: 'required', message: 'Name is required.' },
    ]);
    fixture.detectChanges();
  });

  it('shows validation errors when the control becomes touched', () => {
    expect(fixture.nativeElement.querySelector('.field-error')).toBeNull();

    control.markAsTouched();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.field-error')?.textContent)
      .toContain('Name is required.');
  });

  it('hides validation errors when the control becomes valid', () => {
    control.markAsTouched();
    fixture.detectChanges();
    control.setValue('Solar');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.field-error')).toBeNull();
  });
});
