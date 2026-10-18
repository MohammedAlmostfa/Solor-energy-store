
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { OrdersService } from '../../services/orders';
import {
  Order,
  OrderStatus,
  ORDER_STATUS_LABELS,
} from '../../models/order.model';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent {
  private readonly ordersService = inject(OrdersService);

  readonly orders = this.ordersService.allOrders;
  readonly searchTerm = signal('');
  readonly selectedStatus = signal<OrderStatus | 'all'>('all');

  readonly statusLabels = ORDER_STATUS_LABELS;

  readonly statusOptions: {
    value: OrderStatus;
    label: string;
  }[] = [
    { value: 'pending', label: 'قيد الانتظار' },
    { value: 'processing', label: 'قيد التجهيز' },
    { value: 'completed', label: 'مكتمل' },
    { value: 'cancelled', label: 'ملغي' },
  ];

  readonly filteredOrders = computed(() => {
    const search = this.searchTerm()
      .trim()
      .toLocaleLowerCase();

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

  readonly totalOrders = computed(
    () => this.orders().length,
  );

  readonly pendingOrders = computed(
    () => this.orders().filter(
      (order) => order.status === 'pending',
    ).length,
  );

  readonly processingOrders = computed(
    () => this.orders().filter(
      (order) => order.status === 'processing',
    ).length,
  );

  readonly completedOrders = computed(
    () => this.orders().filter(
      (order) => order.status === 'completed',
    ).length,
  );

  updateSearch(value: string): void {
    this.searchTerm.set(value);
  }

  updateStatusFilter(value: string): void {
    const validStatuses: (OrderStatus | 'all')[] = [
      'all',
      'pending',
      'processing',
      'completed',
      'cancelled',
    ];

    if (validStatuses.includes(value as OrderStatus | 'all')) {
      this.selectedStatus.set(value as OrderStatus | 'all');
    }
  }

  updateOrderStatus(order: Order, value: string): void {
    const validStatuses: OrderStatus[] = [
      'pending',
      'processing',
      'completed',
      'cancelled',
    ];

    if (!validStatuses.includes(value as OrderStatus)) {
      return;
    }

    this.ordersService.updateStatus(
      order.id,
      value as OrderStatus,
    );
  }
}
