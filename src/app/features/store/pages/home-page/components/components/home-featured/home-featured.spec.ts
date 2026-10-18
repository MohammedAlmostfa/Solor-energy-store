import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFeatured } from './home-featured';

describe('HomeFeatured', () => {
  let component: HomeFeatured;
  let fixture: ComponentFixture<HomeFeatured>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeatured],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeatured);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
