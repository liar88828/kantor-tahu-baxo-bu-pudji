/* eslint-disable react-hooks/rules-of-hooks */
import {useFetch} from "@/hook/useFetch"
import {TrolleyParams} from "@/store/useTrolley";
import {TOrderProductDB} from "@/entity/transaction.model";

export const trolleyAll = ({idUser}: TrolleyParams) => {
	return useFetch<TOrderProductDB[]>('GET', 'trolley',)
}

export const trolleyId = (id: TOrderProductDB['id']) => {
	return useFetch('GET', `trolley/${id}`,)
}

export const pushTrolley = (id: TOrderProductDB['id']) => {
	return useFetch('POST', `trolley/${id}`)
}

export const removeTrolley = (id: TOrderProductDB['id']) => {
	return useFetch('DELETE', `trolley/${id}`)
}

export const trolleyIncrement = (id: TOrderProductDB['id']) => {
	return useFetch('POST', `trolley/counter/${id}`)
}

export const trolleyDecrement = (id: TOrderProductDB['id']) => {
	return useFetch('DELETE', `trolley/counter/${id}`)
}

