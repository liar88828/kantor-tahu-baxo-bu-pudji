import React from 'react'
import {exampleDeliveryCreate} from '@/assets/ExampleDelivery'
import {deliveryCreate} from '@/network/delivery'
import type {TDeliveryCreate} from '@/entity/delivery.model'
import DeliveryForm from '../DeliveryForm.client'


export default async function page() {

	const onSubmit = async (value: TDeliveryCreate) => {
		'use server'
		await deliveryCreate(value)
	}

	return (
		<DeliveryForm
			onSubmitAction={onSubmit}
			defaultValues={
				exampleDeliveryCreate
				// await deliveryId(id)
			}
		/>
	)
}
