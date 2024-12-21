/* eslint-disable react-hooks/rules-of-hooks */

import type { TReceiverCreate, TReceiverDB } from "@/interface/entity/receiver.model";
import { toFetch } from "@/hook/toFetch";
import { ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";
import { ProductParams } from "@/server/repository/product.repo";

export const receiverAll = async ({ pagination: { limit } }: ProductParams) => {
	const newUrl = toUrl("receiver", { limit })
	return toFetch<ResponseAll<TReceiverDB>>('GET', newUrl)
};

export const receiverId = async (id: string) => {
	return toFetch<TReceiverDB>('GET', `receiver/${ id }`)
};

export const receiverCreate = async (data: TReceiverCreate) => {
	return toFetch<TReceiverDB>('POST', 'receiver', data)
};

export const receiverUpdate = async (data: TReceiverCreate, id: string) => {
	return toFetch<TReceiverDB>('POST', `receiver/${ id }`, data)
};

export const receiverDelete = async (id: string) => {
	return toFetch<TReceiverDB>('DELETE', `receiver/${ id }`)
};