/* eslint-disable */
import { toFetch } from "@/hook/toFetch";
import { TOrderTransactionCreate, TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";
import { OrderParams, ResponseCreateOrderTransaction } from "@/interface/entity/order.model";

export const orderCreate = (data: TOrderTransactionCreate) => toFetch<ResponseCreateOrderTransaction>('POST', 'order', data)
export const orderUpdate = (data: TOrderTransactionCreate, id: string) => toFetch<ResponseCreateOrderTransaction>('PUT', `order/${ id }`, data)
export const orderAll = ({ filter, pagination }: OrderParams) => {
    const newUrl = toUrl('order', { ...filter, ...pagination })
	return toFetch<ResponseAll<TOrderTransactionDB>>('GET', newUrl)
}
export const orderId = (id:string) => toFetch<TOrderTransactionDB>('GET', `order/${id}`)
export const orderDelete = (id: string) => toFetch('DELETE', `order/${ id }`)
