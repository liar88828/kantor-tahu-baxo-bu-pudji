'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import { orderAll, orderCreate, orderDelete, orderId, orderUpdate } from "@/network/order";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/product";
import { useDeliveryStore } from "@/store/delivery";
import { useReceiverStore } from "@/store/receiver";
import { usePaymentStore } from "@/store/payment";
import { useOrderStore } from "@/store/order";
import { OrderCreateClient } from "@/validation/order.valid";
import { TMethod } from "@/interface/Utils";
import { OrderParams } from "@/interface/entity/order.model";

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
        onMutate: () => {
            return { toastId: toast.loading('Loading...') }
        },
        onSettled: (_, __, ___, context) => {
            product.reset()
            delivery.reset()
            receiver.reset()
            payment.reset()
            order.reset()
            if (context) {
                toast.dismiss(context.toastId)
            }
        },
        mutationFn: ({ data, method, id, isClient }: {
            method: TMethod,
            data: OrderCreateClient,
            id?: string,
            isClient?: boolean
        }) => {
			if (!payment.payment) {
				throw new Error('Payment is not complete');
            }
            if (!delivery.delivery) {
				throw new Error('Delivery is not complete');
            }
            if (product.productStore.length === 0) {
                throw new Error('product is Empty');
            }
            // console.log(data)
            // data.totalAll = order.total;
            // data.totalProduct = product.total;
				const sanitize = order.setData({
					product: product.productStore,
					payment: payment.payment,
					delivery: delivery.delivery,
					receiver: receiver.receiver,
					order: data,
				})
            // console.log(method, id)
            // console.log(sanitize)
            // throw  new Error('error bos')
				if (method === 'PUT' && id) {
					return orderUpdate(sanitize, id)
				} else {
					return orderCreate(sanitize)
				}
		},
		onError: (data, variables, context) => {
            // console.log(data)
			if (data instanceof Error) {
				toast.error(data.message)
			}
		},
		onSuccess: (data, variables, context) => {
			toast.success(data.msg)
            if (variables.isClient) {
                router.push(`/invoice/${ data.data.order.id }?redirect=/home`)
            } else if (variables.method === 'PUT') {
				router.push(`/admin/order/${ variables.id }`)
            } else {
                router.push('/admin/order')
            }
		},
	})

    const GetAll = ({ filter, pagination }: OrderParams, debounce: OrderParams['filter']) => {
		return useQuery({
            enabled: filter?.status === debounce?.status && filter?.name === debounce?.name,
            select: (orders) => orders.data.data,
            queryFn: () => orderAll({ filter, pagination }),
            queryKey: [ ORDER_KEY.order, filter?.name ?? '', filter?.status ?? '' ],

		})
	}
	const GetId = (id: string) => {
		return useQuery({
			queryKey: [ ORDER_KEY, id ],
			queryFn: () => orderId(id)
		})
	}
	const onDelete = useMutation({
		mutationFn: orderDelete,
		onSuccess: () => {
			toast.success('Success Delete Order')
			router.push('/admin/order')
		},
		onError: (data, variables, context) => {
			toast.error('Fail Delete Order')
		}
	})
	return {
		onUpsert,
		getAll: GetAll,
		getId: GetId,
		onDelete
	}
}
