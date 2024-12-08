import React from 'react'
import DeliveryList from "@/app/admin/delivery/DeliveryList.client";
import {deliveryAll} from "@/network/delivery";

export default async function page() {
	const {data: deliverys} = await deliveryAll()

	return (<DeliveryList deliverys={deliverys.data}/>
	)
}
