/* eslint-disable react-hooks/rules-of-hooks */

import { toFetch } from "@/hook/toFetch";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { TPaymentCreate, TPaymentDB } from "@/interface/entity/payment.model";
import { ResponseAll } from "@/interface/server/param";
import { DeliveryParams } from "@/server/repository/delivery.repo";
import { toUrl } from "@/utils/toUrl";

export const paymentAll = async (
    { pagination, filter }: DeliveryParams
) => {
    const newUrl = toUrl('payment', { ...pagination, ...filter })
    return toFetch<ResponseAll<TPaymentDB>>('GET', newUrl)
};

export const paymentId = async (id: string) => {
	return toFetch<TPaymentDB>('GET', `payment/${id}`)
};

export const paymentCreate = async (data: TPaymentCreate) => {
	return toFetch<TDeliveryDB>('POST', 'payment', data)
};

export const paymentUpdate = async (data: TPaymentCreate, id: string) => {
	return toFetch<TDeliveryDB>('POST', `payment/${id}`, data)
};

export const paymentDelete = async (id: string) => {
	return toFetch<TDeliveryDB>('DELETE', `payment/${id}`)
};