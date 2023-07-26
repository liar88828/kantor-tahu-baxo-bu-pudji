import { TOrder } from '@/entity/orderan';

export type  TOrderValid = TOrder["orang"] & { valid: boolean }
export type TOrderSuccess = TOrderValid & { success: boolean }