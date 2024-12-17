'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import { orderAll, orderCreate, orderId, orderUpdate } from "@/network/order";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/product";
import { useDeliveryStore } from "@/store/delivery";
import { useReceiverStore } from "@/store/receiver";
import { usePaymentStore } from "@/store/payment";
import { useOrderStore } from "@/store/order";
import { OrderCreateClient } from "@/validation/order.valid";
import { TMethod } from "@/interface/Utils";

export enum ORDER_KEY {
	order = "order",
}

export function useOrder() {
	const router = useRouter();
	const product = useProductStore();
	const delivery = useDeliveryStore()
	const receiver = useReceiverStore()
	const payment = usePaymentStore()
	const order = useOrderStore()

	const onUpsert = useMutation({
		mutationFn: ({ data, method, id }: { method: TMethod, data: OrderCreateClient, id?: string }) => {
			if (!payment.payment) {
				throw new Error('Payment is not complete');
			} else if (!delivery.delivery) {
				throw new Error('Delivery is not complete');
			} else {
				data.totalAll = order.total;
				data.totalProduct = product.total;
				const sanitize = order.setData({
					product: product.productStore,
					payment: payment.payment,
					delivery: delivery.delivery,
					receiver: receiver.receiver,
					order: data,
				})
				console.log(method, id)
				if (method === 'PUT' && id) {
					return orderUpdate(sanitize, id)
				} else {
					return orderCreate(sanitize)
				}
			}
		},
		onError: (data, variables, context) => {
			if (data instanceof Error) {
				toast.error(data.message)
			}
		},
		onSuccess: (data, variables, context) => {
			console.log(data)
			toast.success(data.msg)
			product.reset()
			delivery.reset()
			receiver.reset()
			payment.reset()
			order.reset()
			if (variables.method === 'PUT') {
				router.push(`/admin/order/${ variables.id }`)
			} else {
			router.push('/admin/order')
			}
		},
	})

	const GetAll = () => {
		return useQuery({
			queryFn: orderAll,
			queryKey: [ ORDER_KEY.order ],

		})
	}
	const GetId = (id: string) => {
		return useQuery({
			queryKey: [ ORDER_KEY, id ],
			queryFn: () => orderId(id)
		})
	}
	return {
		onUpsert,
		getAll: GetAll,
		getId: GetId
	}
}
