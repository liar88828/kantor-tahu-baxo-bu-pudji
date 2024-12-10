/* eslint-disable react-hooks/rules-of-hooks */
import { useFetch } from "@/hook/useFetch"
import { Counter, IdTrolley, TrolleyParams } from "@/store/useTrolley";
import { TOrderProductCreate, TOrderProductDB, TOrderProductList } from "@/entity/transaction.model";
import { ResponseAll } from "@/interface/server/param";

export const userId = '1da116c8-2d8a-4f9b-ae93-37cbad1bd832'

export const trolleyAll = ({idUser}: TrolleyParams) => {
	return useFetch<ResponseAll<TOrderProductList>>('GET', 'trolley',)
}

export const trolleyId = (id: TOrderProductDB['id']) => {
	return useFetch('GET', `trolley/${id}`,)
}

export const pushTrolley = ({ id, qty = 1 }: { id: TOrderProductDB['id'], qty: number }) => {
	const data: TOrderProductCreate = {
		id_user: userId,
		id_product: id,
		qty
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

