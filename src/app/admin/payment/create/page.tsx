import React from 'react'
import {paymentCreate} from "@/network/payment";
import {TPaymentCreate} from "@/entity/payment.model";
import {examplePayment} from "@/assets/ExamplePayment";
import PaymentForm from "@/app/admin/payment/PaymentForm.client";


export default async function page() {

	const onSubmit = async (value: TPaymentCreate) => {
		'use server'
		await paymentCreate(value,)
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
