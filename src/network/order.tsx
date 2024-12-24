/* eslint-disable */
import { toFetch } from "@/hook/toFetch";
import { TOrderTransactionCreate, TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";
import { ResponseCreateOrderTransaction } from "@/server/repository/order.repo";

export const orderCreate = (data: TOrderTransactionCreate) => toFetch<ResponseCreateOrderTransaction>('POST', 'order', data)
export const orderUpdate = (data: TOrderTransactionCreate, id: string) => toFetch<ResponseCreateOrderTransaction>('PUT', `order/${ id }`, data)
export const orderAll = (limit: number = 100) => {
	const newUrl = toUrl('order', { limit })
	return toFetch<ResponseAll<TOrderTransactionDB>>('GET', newUrl)
}
export const orderId = (id:string) => toFetch<TOrderTransactionDB>('GET', `order/${id}`)
export const orderDelete = (id: string) => toFetch('DELETE', `order/${ id }`)
