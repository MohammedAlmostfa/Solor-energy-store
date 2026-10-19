import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeBenefitsComponent } from './home-benefits';

describe('HomeBenefitsComponent', () => {
  let component: HomeBenefitsComponent;
  let fixture: ComponentFixture<HomeBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBenefitsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBenefitsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
