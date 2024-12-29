'use client'
import React, { useEffect } from "react";
import { useProductStore } from "@/store/product";
import { useDeliveryStore } from "@/store/delivery";
import { usePaymentStore } from "@/store/payment";
import { useReceiverStore } from "@/store/receiver";
import { useOrder } from "@/hook/useOrder";
import { useParams } from "next/navigation";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { PageErrorData } from "@/app/components/PageErrorData";
import { orderSanitize } from "@/sanitize/orderSanitize";
import { OrderForm } from "@/app/admin/order/OrderForm.client";

function Page() {
	const param = useParams<{ id: string }>()
	const { getId } = useOrder()
	const { data: order, isLoading, isError } = getId(param.id)
	const { setProductStore } = useProductStore()
	const { setDelivery } = useDeliveryStore()
	const { setReceiver } = useReceiverStore()
	const { setPayment } = usePaymentStore()

	useEffect(() => {
		if (order) {
			setProductStore(order.data.Trolleys.map(d => d))
			setReceiver(order.data.Customers)
			setPayment(order.data.Payments)
			setDelivery(order.data.Deliverys)
		}
	}, [order, setDelivery, setPayment, setProductStore, setReceiver])

	if (isLoading || !order) {
        return <PageLoadingSpin/>
	}
	if (isError) {
        return <PageErrorData/>
	}
	return <OrderForm data={ orderSanitize(order.data) }/>
}

export default Page;
