import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTestimonialsComponent } from './home-testimonials';

describe('HomeTestimonialsComponent', () => {
  let component: HomeTestimonialsComponent;
  let fixture: ComponentFixture<HomeTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTestimonialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTestimonialsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
