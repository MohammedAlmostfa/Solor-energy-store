
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import {
  DataTableComponent,
  type TableColumn,
} from '../../components/data-table/data-table';
import { DataTableCellTemplateDirective } from '../../components/data-table/data-table-cell-template';
import { StatCardComponent } from '../../components/stat-card/stat-card';

import { OrdersService } from '../../services/orders';
import {
  ORDER_STATUS_OPTIONS,
  type Order,
  type OrderStatus,
} from '../../models/order.model';

function isOrderStatus(value: string): value is OrderStatus {
  return ORDER_STATUS_OPTIONS.some((option) => option.value === value);
}

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    DataTableComponent,
    DataTableCellTemplateDirective,
    StatCardComponent,
  ],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent {
  private readonly ordersService = inject(OrdersService);

  readonly orders = this.ordersService.allOrders;

  readonly searchTerm = signal('');
  readonly selectedStatus = signal<OrderStatus | 'all'>('all');

  readonly tableColumns: TableColumn[] = [
    { key: 'orderNumber', label: 'رقم الطلب' },
    { key: 'customer', label: 'العميل' },
    { key: 'createdAt', label: 'تاريخ الطلب' },
    { key: 'itemsCount', label: 'عدد المنتجات' },
    { key: 'total', label: 'الإجمالي' },
    { key: 'status', label: 'الحالة' },
    { key: 'actions', label: 'تغيير الحالة' },
  ];

  readonly statusOptions = ORDER_STATUS_OPTIONS;

  readonly totalOrders = computed(() => this.orders().length);

  readonly pendingOrders = computed(
    () =>
      this.orders().filter((order) => order.status === 'pending').length,
  );

  readonly processingOrders = computed(
    () =>
      this.orders().filter((order) => order.status === 'processing').length,
  );

  readonly completedOrders = computed(
    () =>
      this.orders().filter((order) => order.status === 'completed').length,
  );

  readonly filteredOrders = computed(() => {
    const search = this.searchTerm().trim().toLocaleLowerCase();
    const status = this.selectedStatus();

    return this.orders().filter((order) => {
      const matchesSearch =
        !search ||
        order.orderNumber.toLocaleLowerCase().includes(search) ||
        order.customerName.toLocaleLowerCase().includes(search) ||
        order.customerPhone.includes(search);

      const matchesStatus =
        status === 'all' || order.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  updateSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchTerm.set(event.target.value);
    }
  }

  updateStatusFilter(event: Event): void {
    if (!(event.target instanceof HTMLSelectElement)) {
      return;
    }

    const value = event.target.value;
    if (value === 'all') {
      this.selectedStatus.set('all');
      return;
    }

    if (isOrderStatus(value)) {
      this.selectedStatus.set(value);
    }
  }

  getStatusLabel(status: OrderStatus): string {
    const option = ORDER_STATUS_OPTIONS.find(
      (candidate) => candidate.value === status,
    );

    if (!option) {
      throw new Error(`Missing label for order status "${status}".`);
    }

    return option.label;
  }

  updateOrderStatus(order: Order, event: Event): void {
    if (!(event.target instanceof HTMLSelectElement)) {
      return;
    }

    const status = event.target.value;
    if (!isOrderStatus(status)) {
      return;
    }

    if (status === order.status) {
      return;
    }

    this.ordersService.updateStatus(order.id, status);
  }
}
