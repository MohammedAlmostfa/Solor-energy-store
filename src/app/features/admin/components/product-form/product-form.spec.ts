import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOCK_CATEGORIES } from '../../../catalog/data/categories.data';
import { ProductFormComponent } from './product-form';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    fixture.componentRef.setInput('categories', MOCK_CATEGORIES);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders categories from its input', () => {
    const options = Array.from(
      fixture.nativeElement.querySelectorAll('select[name="category"] option'),
    ) as HTMLOptionElement[];

    expect(options.map((option) => option.value)).toEqual(
      ['', ...MOCK_CATEGORIES.map((category) => category.id)],
    );
  });
});
