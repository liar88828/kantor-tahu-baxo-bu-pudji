import React from 'react'
import { DeliveryFormClientAdmin } from "@/app/components/delivery/delivery.client";
import { exampleDelivery } from '@/assets/ExampleDelivery'

export default function page() {
	return (
        <DeliveryFormClientAdmin
			defaultValues={exampleDelivery}
			method={'POST'}
			id={''}
		/>
	)
}
