import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPageHeaderComponent } from './page-header';

describe('PageHeade', () => {
  let component: AdminPageHeaderComponent;
  let fixture: ComponentFixture<AdminPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPageHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
