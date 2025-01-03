/* eslint-disable react-hooks/rules-of-hooks */

import { toFetch } from "@/hook/toFetch";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { TPaymentCreate, TPaymentDB } from "@/interface/entity/payment.model";
import { ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";
import { DeliveryParams } from "@/server/repository/delivery.repo";

export const paymentAll = async ({ pagination, filter }: DeliveryParams) => {
    const url = toUrl('payment', { ...pagination, ...filter })
    return toFetch<ResponseAll<TPaymentDB>>('GET', { url })
};

export const paymentId = async (id: string) => {
    return toFetch<TPaymentDB>('GET', {
        url: `payment/${ id }`
    })
};

export const paymentCreate = async (data: TPaymentCreate) => {
    return toFetch<TDeliveryDB>('POST', { url: 'payment', data })
};

export const paymentUpdate = async (data: TPaymentCreate, id: string) => {
    return toFetch<TDeliveryDB>('POST', { url: `payment/${ id }`, data })
};

export const paymentDelete = async (id: string) => {
    return toFetch<TDeliveryDB>('DELETE', { url: `payment/${ id }` })
};