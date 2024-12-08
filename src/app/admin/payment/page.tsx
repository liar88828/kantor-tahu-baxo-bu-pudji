import React from 'react'
import PaymentList from "@/app/admin/payment/PaymentList.client";
import {paymentAll} from "@/network/payment";

export default async function page() {
	const {data: payments} = await paymentAll()

	return <PaymentList payments={payments.data}/>
}
