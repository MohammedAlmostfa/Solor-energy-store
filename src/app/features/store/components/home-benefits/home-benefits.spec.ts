import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeBenefits } from './home-benefits';

describe('HomeBenefits', () => {
  let component: HomeBenefits;
  let fixture: ComponentFixture<HomeBenefits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBenefits],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBenefits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
