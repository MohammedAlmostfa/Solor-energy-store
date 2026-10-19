
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
  readonly rows = input.required<readonly unknown[]>();
  readonly emptyMessage = input('لا توجد بيانات لعرضها');

  @ContentChildren(DataTableCellTemplateDirective)
  private cellTemplates!: QueryList<DataTableCellTemplateDirective>;

  getCellTemplate(key: string): DataTableCellTemplateDirective | undefined {
    return this.cellTemplates?.find(
      (cellTemplate) => cellTemplate.key() === key,
    );
  }

  getCellValue(row: unknown, key: string): unknown {
    if (typeof row !== 'object' || row === null) {
      return '';
    }

    return (row as Record<string, unknown>)[key] ?? '';
  }
}
