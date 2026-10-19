
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
import type { Order, OrderStatus } from '../../models/order.model';

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

  readonly statusOptions: { value: OrderStatus; label: string }[] = [
    { value: 'pending', label: 'قيد الانتظار' },
    { value: 'processing', label: 'قيد التجهيز' },
    { value: 'completed', label: 'مكتمل' },
    { value: 'cancelled', label: 'ملغي' },
  ];

  readonly statusLabels: Record<OrderStatus, string> = {
    pending: 'قيد الانتظار',
    processing: 'قيد التجهيز',
    completed: 'مكتمل',
    cancelled: 'ملغي',
  };

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

  updateSearch(value: string): void {
    this.searchTerm.set(value);
  }

  updateStatusFilter(value: string): void {
    const isValidStatus =
      value === 'all' ||
      this.statusOptions.some((option) => option.value === value);

    if (!isValidStatus) {
      return;
    }

    this.selectedStatus.set(value as OrderStatus | 'all');
  }

  getStatusLabel(status: OrderStatus): string {
    return this.statusLabels[status];
  }

  updateOrderStatus(order: Order, value: string): void {
    const isValidStatus = this.statusOptions.some(
      (option) => option.value === value,
    );

    if (!isValidStatus) {
      return;
    }

    const status = value as OrderStatus;

    if (status === order.status) {
      return;
    }

    this.ordersService.updateStatus(order.id, status);
  }
}

