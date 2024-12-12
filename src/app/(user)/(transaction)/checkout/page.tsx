'use client'
import React, { useCallback } from 'react';
import { toRupiah } from "@/utils/toRupiah";
import useTrolleyStore from "@/store/trolley";
import { useOrderStore } from "@/store/order";
import { redirect } from "next/navigation";
import { Delivery, Payment, Product, Receiver } from "@/app/components/order";

function Page() {
	const { setData, onData, onDelivery } = useOrderStore();
	const { onSelected } = useTrolleyStore();

	// Calculate subtotal based on trolley items
	const subtotal = useCallback(() => onSelected.reduce((total, item) => {
			return total + item.qty_at_buy * item.price_at_buy
		}, 0),
		[ onSelected ]
	)
	const delivery = onDelivery ? onDelivery.price : 0

	if (onSelected.length === 0) {
		redirect('/trolley')
	}
	console.log(onData)
	return (
		<div className={ 'container px-2 space-y-5' }>
			<Receiver/>
			<Product/>
			<Delivery/>
			<Payment/>
			<div>
				<h2 className="text-lg font-semibold">Summary</h2>
				<div className="mt-3 space-y-2">
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>{ toRupiah(subtotal()) }</span>
					</div>
					<div className="flex justify-between">
						<span>Delivery Fee</span>
						<span>{ toRupiah(delivery) }</span>
					</div>
					<div className="flex justify-between font-bold">
						<span>Total</span>
						<span>{ toRupiah(subtotal() + delivery) }</span>
					</div>
				</div>
				<button
					className="mt-5 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
					onClick={ () => {
						setData({ trolley: onSelected })
					} }
				>
					Confirm Order
				</button>
			</div>
		</div>
	);
}

export default Page;

