/* eslint-disable react-hooks/rules-of-hooks */
'use server'

import { useFetch } from "@/hook/useFetch";
import {TDeliveryDB} from "@/entity/delivery.model";
import {TPaymentCreate, TPaymentDB} from "@/entity/payment.model";

export async function onSubmit(value: any) {
  console.log(value)
}
export const paymentId = async (id: string) => {
  return useFetch<TPaymentDB>('GET', 'payment')
};

export const paymentAll = async () => {
  return useFetch<TPaymentDB[]>('GET', 'payment')
};

export const paymentCreate = async (data: TPaymentCreate) => {
  console.log(data)
  // return useFetch<TDeliveryDB>('POST', 'payment', data)
};
export const paymentUpdate = async (data: TPaymentCreate, id: string) => {
  console.log(data, id)

  // return useFetch<TDeliveryDB>('POST', `payment/${id}`, data)
};
export const paymentDelete = async (id: string) => {
  return useFetch<TDeliveryDB>('DELETE', `payment/${id}`)
};