/* eslint-disable */
import { useFetch } from "@/hook/useFetch";
import { TOrderTransactionCreate, TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { ResponseAll } from "@/interface/server/param";

export const orderCreate = (data: TOrderTransactionCreate) => useFetch('POST', 'order', data)
export const orderUpdate = (data: TOrderTransactionCreate,id:string) => useFetch('PUT', `order/${id}`, data)
export const orderAll = () => useFetch<ResponseAll<TOrderTransactionDB>>('GET', 'order')
export const orderId = (id:string) => useFetch<TOrderTransactionDB>('GET', `order/${id}`)