import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppButtonComponent } from './app-button';

describe('AppButtonComponent', () => {
  let fixture: ComponentFixture<AppButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppButtonComponent);
    fixture.detectChanges();
  });

  it('emits clicked when its button is activated', () => {
    const clicked = vi.fn();
    fixture.componentInstance.clicked.subscribe(clicked);

    fixture.nativeElement.querySelector('button').click();

    expect(clicked).toHaveBeenCalledOnce();
  });

  it('applies full-width styling only when requested', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    expect(button.classList).not.toContain('button-full-width');

    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();

    expect(button.classList).toContain('button-full-width');
  });
});
