/* eslint-disable react-hooks/rules-of-hooks */
'use server'

import type { TDeliveryCreate, TDeliveryDB } from "@/entity/delivery.model";
import { useFetch } from "@/hook/useFetch";

export async function onSubmit(value: any) {
  console.log(value)
}
export const deliveryId = async (id: string) => {
  return useFetch<TDeliveryDB>('GET', 'delivery')
};

export const deliveryAll = async () => {
  return useFetch<TDeliveryDB[]>('GET', 'delivery')
};

export const deliveryCreate = async (data: TDeliveryCreate) => {
  console.log(data)
  // return useFetch<TDeliveryDB>('POST', 'delivery', data)
};
export const deliveryUpdate = async (data: TDeliveryCreate, id: string) => {
  console.log(data, id)

  // return useFetch<TDeliveryDB>('POST', `delivery/${id}`, data)
};
export const deliveryDelete = async (id: string) => {
  return useFetch<TDeliveryDB>('DELETE', `delivery/${id}`)
};