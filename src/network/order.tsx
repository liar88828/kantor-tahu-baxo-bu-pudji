/* eslint-disable */
import { useFetch } from "@/hook/useFetch";
import { TOrderTransactionCreate, TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { ResponseAll } from "@/interface/server/param";

export const orderPost = (data: TOrderTransactionCreate) => useFetch('POST', 'order', data)
export const orderGet = () => useFetch<ResponseAll<TOrderTransactionDB>>('GET', 'order')