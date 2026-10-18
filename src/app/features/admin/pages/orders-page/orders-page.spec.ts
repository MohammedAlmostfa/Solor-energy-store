import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersPageTs } from './orders-page.js';

describe('OrdersPageTs', () => {
  let component: OrdersPageTs;
  let fixture: ComponentFixture<OrdersPageTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersPageTs],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersPageTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
