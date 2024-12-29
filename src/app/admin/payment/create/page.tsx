import React from 'react'
import {examplePayment} from "@/assets/ExamplePayment";
import PaymentForm from "@/app/admin/payment/PaymentForm.client";


export default async function page() {
	return (
		<PaymentForm
			defaultValues={examplePayment}
			method={'POST'}
			id={''}
		/>
	)
}
