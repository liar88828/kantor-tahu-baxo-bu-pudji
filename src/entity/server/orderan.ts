import { TOrder } from '@/entity/orderan';

export type  TOrderValid = TOrder & { valid: boolean }
export type TOrderSuccess = TOrderValid & { success: boolean }