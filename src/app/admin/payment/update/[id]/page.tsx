import React from 'react'
import PaymentForm from '../../PaymentForm.client'
import type {TContext} from '@/interface/server/param'
import {getId} from '@/lib/requestHelper'
import {paymentUpdate} from "@/network/payment";
import {TPaymentCreate} from "@/entity/payment.model";
import {examplePayment} from "@/assets/ExamplePayment";


export default async function page(context: TContext) {

	const id = await getId(context)
	const onSubmit = async (value: TPaymentCreate) => {
		'use server'
		await paymentUpdate(value, id)
	}

	return (
		<PaymentForm
			onSubmitAction={onSubmit}
			defaultValues={
				examplePayment
				// await deliveryId(id)
			}
		/>
	)
}
