
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

export const ORDER_STATUS_OPTIONS = [
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'processing', label: 'قيد التجهيز' },
  { value: 'completed', label: 'مكتمل' },
  { value: 'cancelled', label: 'ملغي' },
] satisfies readonly { value: OrderStatus; label: string }[];
