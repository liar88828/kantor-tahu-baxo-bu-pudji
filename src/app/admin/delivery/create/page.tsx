import React from 'react'
import {exampleDelivery} from '@/assets/ExampleDelivery'
import DeliveryForm from '../DeliveryForm.client'

export default function page() {
	return (
		<DeliveryForm
			defaultValues={exampleDelivery}
			method={'POST'}
			id={''}
		/>
	)
}
