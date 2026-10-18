
export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled';

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  createdAt: string;
  total: number;
  itemsCount: number;
  status: OrderStatus;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'قيد الانتظار',
  processing: 'قيد التجهيز',
  completed: 'مكتمل',
  cancelled: 'ملغي',
};
