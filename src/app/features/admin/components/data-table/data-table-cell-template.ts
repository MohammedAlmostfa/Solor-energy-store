
import {
  Directive,
  TemplateRef,
  input,
} from '@angular/core';

export interface DataTableCellContext {
  $implicit: object;
  row: object;
  value: unknown;
}

@Directive({
  selector: 'ng-template[appDataTableCellTemplate]',
  standalone: true,
})
export class DataTableCellTemplateDirective {
  readonly key = input.required<string>({
    alias: 'appDataTableCellTemplate',
  });

  constructor(
    readonly template: TemplateRef<DataTableCellContext>,
  ) {}
}
