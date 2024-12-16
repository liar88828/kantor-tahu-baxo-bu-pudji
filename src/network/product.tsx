/* eslint-disable react-hooks/rules-of-hooks */
import {TProductCreate, TProductDB} from "@/interface/entity/product.model"
import {useFetch} from "@/hook/useFetch"
import {ResponseAll} from "@/interface/server/param";

export const productAll = async () => {
	return useFetch<ResponseAll<TProductDB>>('GET', 'product',)
}
export const productId = async (id: string) => {
	return useFetch<TProductDB>('GET', `product/${id}`,)
}
export const productCreate = async (data: TProductCreate) => {
	return useFetch('POST', `product`, data)
}
export const productUpdate = async (data: TProductCreate, id: string) => {
	return useFetch('PUT', `product/${id}`, data)
}
export const productDelete = async (id: string) => {
	return useFetch('DELETE', `product/${id}`)
}