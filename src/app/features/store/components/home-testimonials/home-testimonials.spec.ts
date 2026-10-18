import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTestimonials } from './home-testimonials';

describe('HomeTestimonials', () => {
  let component: HomeTestimonials;
  let fixture: ComponentFixture<HomeTestimonials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTestimonials],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTestimonials);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
