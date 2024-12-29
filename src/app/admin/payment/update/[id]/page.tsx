import React from 'react'
import PaymentForm from '../../PaymentForm.client'
import type {TContext} from '@/interface/server/param'
import {getId} from '@/utils/requestHelper'
import {paymentId} from "@/network/payment";

export default async function page(context: TContext) {

	const id = await getId(context)
	const {data} = await paymentId(id)
	console.log(data)
	return (
		<PaymentForm
			defaultValues={data}
			method={'PUT'}
			id={id}
		/>
	)
}
