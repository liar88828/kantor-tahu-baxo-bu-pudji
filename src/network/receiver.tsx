/* eslint-disable react-hooks/rules-of-hooks */
'use server'

import type { TReceiverCreate, TReceiverDB } from "@/entity/receiver.model";
import { useFetch } from "@/hook/useFetch";
import { ResponseAll } from "@/interface/server/param";

export const receiverAll = async () => {
	return useFetch<ResponseAll<TReceiverDB>>('GET', 'receiver')
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