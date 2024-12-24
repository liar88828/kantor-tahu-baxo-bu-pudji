import { toFetch } from "@/hook/toFetch"
import { Counter, IdTrolley } from "@/hook/useTrolley";
import { ResponseAll } from "@/interface/server/param";
import { TTrolleyCreate, TTrolleyDB, TTrolleyProductDB } from "@/interface/entity/trolley.model";

export const userId = 'ce2d9fac-7ab6-4b66-9e3a-8ef979b16dbe'

export const trolleyAll = () => {
	return toFetch<ResponseAll<TTrolleyProductDB>>('GET', 'trolley',)
}

export const trolleyId = (id: TTrolleyDB['id']) => {
	return toFetch('GET', `trolley/${id}`,)
}

export const pushTrolley = ({ id, qty = 1, price }: { id: TTrolleyDB['id'], qty: number, price: number }) => {
    const data: Omit<TTrolleyCreate, 'id_user'> = {
		id_product: id,
		qty_at_buy: qty,
		price_at_buy: price,
	}
	return toFetch('POST', `trolley`,data)
}

export const removeTrolley = ({ idTrolley }: IdTrolley) => {
	return toFetch('DELETE', `trolley/${idTrolley}`)
}

export const trolleyIncrement = (data:Counter) => {
	return toFetch('POST', `trolley/counter/${data.idTrolley}`)
}

export const trolleyDecrement = (data:Counter) => {
	return toFetch('DELETE', `trolley/counter/${data.idTrolley}`)
}

export const trolleyCount = () => {
    return toFetch<number>('GET', `trolley/counter`,)
}
