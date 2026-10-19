import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeFeaturedComponent } from './home-featured';

describe('HomeFeaturedComponent', () => {
  let component: HomeFeaturedComponent;
  let fixture: ComponentFixture<HomeFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturedComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeaturedComponent);
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
