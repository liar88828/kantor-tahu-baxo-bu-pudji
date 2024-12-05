/* eslint-disable react-hooks/rules-of-hooks */
import type {TProductCreate} from "@/entity/product.model"
import {useFetch} from "@/hook/useFetch"

export const productAll = () => {
	return useFetch('GET', 'product',)
}
export const productId = (id: string) => {
	return useFetch('GET', `product/${id}`,)
}
export const productCreate = (data: TProductCreate) => {
	return useFetch('POST', `product`, data)
}
export const productUpdate = (data: TProductCreate, id: string) => {
	return useFetch('PUT', `product/${id}`, data)
}
export const productDelete = (id: string) => {
	return useFetch('DELETE', `product/${id}`)
}