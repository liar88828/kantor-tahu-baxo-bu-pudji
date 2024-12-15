/* eslint-disable */
import { useFetch } from "@/hook/useFetch";
import { TOrderTransactionCreate, TOrderTransactionDB } from "@/entity/transaction.model";

export const orderPost = (data: TOrderTransactionCreate) => useFetch('POST', 'order', data)
export const orderGet = () => useFetch<TOrderTransactionDB[]>('GET', 'order')