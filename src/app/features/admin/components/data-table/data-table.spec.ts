import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    fixture.componentRef.setInput('columns', []);
    fixture.componentRef.setInput('rows', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders values from object rows', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', label: 'Name' },
    ]);
    fixture.componentRef.setInput('rows', [{ name: 'Solar panel' }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('tbody')?.textContent)
      .toContain('Solar panel');
  });
});
