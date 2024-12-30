import type { TDeliveryCreate, TDeliveryDB } from "@/interface/entity/delivery.model";
import { toFetch } from "@/hook/toFetch";
import { ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";
import { DeliveryParams } from "@/server/repository/delivery.repo";

export const deliveryAll = async (
    { pagination, filter }: DeliveryParams
) => {
    const url = toUrl("delivery", { ...pagination, ...filter })
    return toFetch<ResponseAll<TDeliveryDB>>('GET', { url })
};

export const deliveryId = async (idDelivery: string) => {
    return toFetch<TDeliveryDB>('GET', {
        url: `delivery/${ idDelivery }`
    })
};

export const deliveryCreate = async (data: TDeliveryCreate) => {
    return toFetch<TDeliveryDB>('POST', { url: 'delivery', data })
};

export const deliveryUpdate = async (data: TDeliveryCreate, id: string) => {
    return toFetch<TDeliveryDB>('PUT', {
        url: `delivery/${ id }`, data
    })
};

export const deliveryDelete = async (id: string) => {
    return toFetch<TDeliveryDB>('DELETE', {
        url: `delivery/${ id }`
    })
};
