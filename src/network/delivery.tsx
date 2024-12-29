/* eslint-disable react-hooks/rules-of-hooks */

import type { TDeliveryCreate, TDeliveryDB } from "@/interface/entity/delivery.model";
import { useFetch } from "@/hook/useFetch";
import { ResponseAll } from "@/interface/server/param";
import { DeliveryParams } from "@/server/repository/delivery.repo";
import { toUrl } from "@/utils/toUrl";

export const deliveryAll = async (
	// { pagination, filter }: DeliveryParams
) => {
	// const newUrl = toUrl("delivery", { ...pagination, ...filter })
	return useFetch<ResponseAll<TDeliveryDB>>('GET', 'delivery')
};

export const deliveryId = async (id: string) => {
	return useFetch<TDeliveryDB>('GET', `delivery/${id}`)
};

export const deliveryCreate = async (data: TDeliveryCreate) => {
	return useFetch<TDeliveryDB>('POST', 'delivery', data)
};

export const deliveryUpdate = async (data: TDeliveryCreate, id: string) => {
	return useFetch<TDeliveryDB>('PUT', `delivery/${id}`, data)
};

export const deliveryDelete = async (id: string) => {
	return useFetch<TDeliveryDB>('DELETE', `delivery/${id}`)
};