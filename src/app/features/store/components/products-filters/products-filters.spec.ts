import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsFiltersComponent } from './products-filters';

describe('ProductsFiltersComponent', () => {
  let component: ProductsFiltersComponent;
  let fixture: ComponentFixture<ProductsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFiltersComponent);
    fixture.componentRef.setInput('categories', []);
    fixture.componentRef.setInput('searchTerm', '');
    fixture.componentRef.setInput('selectedCategory', 'all');
    fixture.componentRef.setInput('sortOption', 'default');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
