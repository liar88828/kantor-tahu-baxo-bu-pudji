/* eslint-disable react-hooks/rules-of-hooks */

import type { TReceiverCreate, TReceiverDB } from "@/interface/entity/receiver.model";
import { useFetch } from "@/hook/useFetch";
import { ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";
import { ProductParams } from "@/server/repository/product.repo";

export const receiverAll = async ({ pagination: { limit } }: ProductParams) => {
	const newUrl = toUrl("receiver", { limit })
	return useFetch<ResponseAll<TReceiverDB>>('GET', newUrl)
};

export const receiverId = async (id: string) => {
	return useFetch<TReceiverDB>('GET', `receiver/${ id }`)
};

export const receiverCreate = async (data: TReceiverCreate) => {
	return useFetch<TReceiverDB>('POST', 'receiver', data)
};

export const receiverUpdate = async (data: TReceiverCreate, id: string) => {
	return useFetch<TReceiverDB>('POST', `receiver/${ id }`, data)
};

export const receiverDelete = async (id: string) => {
	return useFetch<TReceiverDB>('DELETE', `receiver/${ id }`)
};