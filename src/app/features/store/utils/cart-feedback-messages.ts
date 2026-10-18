
import type { AddToCartResult } from '../models/add-to-cart-result.model';

export const CART_FEEDBACK_MESSAGES: Record<AddToCartResult, string> = {
  added: 'تمت إضافة المنتج إلى السلة.',
  'out-of-stock': 'هذا المنتج غير متوفر حالياً.',
  inactive: 'هذا المنتج غير متاح للشراء.',
  'stock-limit-reached': 'وصلت للحد الأقصى المتوفر من هذا المنتج.',
};
