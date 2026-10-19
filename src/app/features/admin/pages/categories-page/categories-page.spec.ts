import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesService } from '../../../catalog/services/categories';
import { CategoriesPageComponent } from './categories-page';

describe('CategoriesPageComponent', () => {
  let component: CategoriesPageComponent;
  let fixture: ComponentFixture<CategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows categories added through the shared category service', () => {
    TestBed.inject(CategoriesService).addCategory('Charging controllers');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('tbody')?.textContent)
      .toContain('Charging controllers');
  });

  it('filters categories from the shared form-field search control', () => {
    TestBed.inject(CategoriesService).addCategory('Charging controllers');
    component.searchControl.setValue('Charging');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('tbody')?.textContent)
      .toContain('Charging controllers');
    expect(component.filteredCategories()).toHaveLength(1);
  });

  it('shows required validation through the shared form field', () => {
    component.saveCategory();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.field-error')?.textContent)
      .toContain('يرجى إدخال اسم التصنيف.');
  });

  it('saves a valid category from the shared form control', () => {
    component.categoryNameControl.setValue('Charging controllers');
    component.saveCategory();
    fixture.detectChanges();

    expect(component.categories().some(
      (category) => category.name === 'Charging controllers',
    )).toBe(true);
    expect(component.categoryNameControl.value).toBe('');
  });

  it('clears a category error when the name is edited', () => {
    component.categoryNameControl.setValue(component.categories()[0].name);
    component.saveCategory();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '#category-name',
    ) as HTMLInputElement;
    input.value = 'Updated category';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.errorMessage()).toBe('');
  });
});
