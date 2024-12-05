/* eslint-disable react-hooks/rules-of-hooks */
import type {TProductCreate} from "@/entity/product.model"
import {useFetch} from "@/hook/useFetch"

export const trolleyAll = () => {
	return useFetch('GET', 'trolley',)
}
export const trolleyId = (id: string) => {
	return useFetch('GET', `trolley/${id}`,)
}

export const trolleyIncrement = (id: string) => {
	return useFetch('POST', `trolley/${id}`)
}
export const trolleyDecrement = (id: string) => {
	return useFetch('DELETE', `trolley/${id}`)
}