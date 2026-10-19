import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeContactComponent } from './home-contact';

describe('HomeContactComponent', () => {
  let component: HomeContactComponent;
  let fixture: ComponentFixture<HomeContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeContactComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
