/* eslint-disable react-hooks/rules-of-hooks */
import { useFetch } from "@/hook/useFetch"
import { Counter, IdTrolley, TrolleyParams } from "@/store/useTrolley";
import { ResponseAll } from "@/interface/server/param";
import { TTrolleyCreate, TTrolleyDB, TTrolleyProductDB } from "@/entity/trolley.model";

export const userId = '1da116c8-2d8a-4f9b-ae93-37cbad1bd832'

export const trolleyAll = ({idUser}: TrolleyParams) => {
	return useFetch<ResponseAll<TTrolleyProductDB>>('GET', 'trolley',)
}

export const trolleyId = (id: TTrolleyDB['id']) => {
	return useFetch('GET', `trolley/${id}`,)
}

export const pushTrolley = ({ id, qty = 1, price }: { id: TTrolleyDB['id'], qty: number, price: number }) => {
	const data: TTrolleyCreate = {
		id_user: userId,
		id_product: id,
		qty_at_buy: qty,
		price_at_buy: price,
	}
	return useFetch('POST', `trolley`,data)
}

export const removeTrolley = ({ idTrolley }: IdTrolley) => {
	return useFetch('DELETE', `trolley/${idTrolley}`)
}

export const trolleyIncrement = (data:Counter) => {
	return useFetch('POST', `trolley/counter/${data.idTrolley}`)
}

export const trolleyDecrement = (data:Counter) => {
	return useFetch('DELETE', `trolley/counter/${data.idTrolley}`)
}

export const trolleyCount = () => {
	return useFetch<number>('GET', `trolley/count`,)
}
