
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableCellTemplateDirective } from './data-table-cell-template';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'start' | 'center' | 'end';
}

function hasOwnProperty<O extends object, K extends PropertyKey>(
  value: O,
  key: K,
): value is O & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(value, key);
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  readonly columns = input.required<TableColumn[]>();
  readonly rows = input.required<readonly object[]>();
  readonly emptyMessage = input('لا توجد بيانات لعرضها');

  @ContentChildren(DataTableCellTemplateDirective)
  private cellTemplates!: QueryList<DataTableCellTemplateDirective>;

  getCellTemplate(key: string): DataTableCellTemplateDirective | undefined {
    return this.cellTemplates?.find(
      (cellTemplate) => cellTemplate.key() === key,
    );
  }

  getCellValue(row: object, key: string): unknown {
    if (!hasOwnProperty(row, key)) {
      return '';
    }

    return row[key] ?? '';
  }
}
