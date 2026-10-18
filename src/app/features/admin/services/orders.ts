
import { Injectable, signal } from '@angular/core';

import { MOCK_ORDERS } from '../data/orders.data';
import { Order, OrderStatus } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly ordersState = signal<Order[]>(
    MOCK_ORDERS.map((order) => ({ ...order })),
  );

  readonly allOrders = this.ordersState.asReadonly();

  updateStatus(id: number, status: OrderStatus): boolean {
    const exists = this.ordersState().some(
      (order) => order.id === id,
    );

    if (!exists) {
      return false;
    }

    this.ordersState.update((orders) =>
      orders.map((order) =>
        order.id === id
          ? { ...order, status }
          : order,
      ),
    );

    return true;
  }
}
