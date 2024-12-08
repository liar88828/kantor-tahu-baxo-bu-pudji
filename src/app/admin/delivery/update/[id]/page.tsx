import React from 'react'
import DeliveryForm from '../../DeliveryForm.client'
import {deliveryId} from '@/network/delivery'
import type {TContext} from '@/interface/server/param'
import {getId} from '@/lib/requestHelper'


export default async function page(context: TContext) {

	const id = await getId(context)
	const {data} = await deliveryId(id)

	return (
		<DeliveryForm
			defaultValues={data}
			method={'PUT'}
			id={''}
		/>
	)
}
