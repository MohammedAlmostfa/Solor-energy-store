import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsGridComponent } from './products-grid';

describe('ProductsGridComponent', () => {
  let component: ProductsGridComponent;
  let fixture: ComponentFixture<ProductsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsGridComponent);
    fixture.componentRef.setInput('products', []);
    fixture.componentRef.setInput('categoryLabels', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
