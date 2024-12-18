/* eslint-disable */
import { useFetch } from "@/hook/useFetch";
import { TOrderTransactionCreate, TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";

export const orderCreate = (data: TOrderTransactionCreate) => useFetch('POST', 'order', data)
export const orderUpdate = (data: TOrderTransactionCreate,id:string) => useFetch('PUT', `order/${id}`, data)
export const orderAll = (limit: number = 100) => {
	const newUrl = toUrl('order', { limit })
	return useFetch<ResponseAll<TOrderTransactionDB>>('GET', newUrl)
}
export const orderId = (id:string) => useFetch<TOrderTransactionDB>('GET', `order/${id}`)
export const orderDelete = (id: string) => useFetch('DELETE', `order/${ id }`)
