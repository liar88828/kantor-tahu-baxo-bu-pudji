/* eslint-disable react-hooks/rules-of-hooks */

import { useFetch } from "@/hook/useFetch";
import { TDeliveryDB } from "@/entity/delivery.model";
import { TPaymentCreate, TPaymentDB } from "@/entity/payment.model";
import { ResponseAll } from "@/interface/server/param";

export const paymentAll = async () => {
	return useFetch<ResponseAll<TPaymentDB>>('GET', 'payment')
};

export const paymentId = async (id: string) => {
	return useFetch<TPaymentDB>('GET', `payment/${id}`)
};

export const paymentCreate = async (data: TPaymentCreate) => {
	console.log(data)
	return useFetch<TDeliveryDB>('POST', 'payment', data)
};

export const paymentUpdate = async (data: TPaymentCreate, id: string) => {
	console.log(data, id)
	return useFetch<TDeliveryDB>('POST', `payment/${id}`, data)
};

export const paymentDelete = async (id: string) => {
	return useFetch<TDeliveryDB>('DELETE', `payment/${id}`)
};