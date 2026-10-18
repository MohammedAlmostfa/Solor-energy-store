import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeContact } from './home-contact';

describe('HomeContact', () => {
  let component: HomeContact;
  let fixture: ComponentFixture<HomeContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeContact],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
