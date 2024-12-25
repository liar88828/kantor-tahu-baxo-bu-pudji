/* eslint-disable react-hooks/rules-of-hooks */

import type { TDeliveryCreate, TDeliveryDB } from "@/interface/entity/delivery.model";
import { toFetch } from "@/hook/toFetch";
import { ResponseAll } from "@/interface/server/param";
import { DeliveryParams } from "@/server/repository/delivery.repo";
import { toUrl } from "@/utils/toUrl";

export const deliveryAll = async (
    { pagination, filter }: DeliveryParams
) => {
    const newUrl = toUrl("delivery", { ...pagination, ...filter })
    return toFetch<ResponseAll<TDeliveryDB>>('GET', newUrl)
};

export const deliveryId = async (id: string) => {
	return toFetch<TDeliveryDB>('GET', `delivery/${id}`)
};

export const deliveryCreate = async (data: TDeliveryCreate) => {
	return toFetch<TDeliveryDB>('POST', 'delivery', data)
};

export const deliveryUpdate = async (data: TDeliveryCreate, id: string) => {
	return toFetch<TDeliveryDB>('PUT', `delivery/${id}`, data)
};

export const deliveryDelete = async (id: string) => {
	return toFetch<TDeliveryDB>('DELETE', `delivery/${id}`)
};