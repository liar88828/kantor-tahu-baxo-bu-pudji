'use client'
import toast from "react-hot-toast";
import { ORDER, OrderParams } from "@/interface/entity/order.model";
import { OrderCreateClient } from "@/validation/order.valid";
import { TMethod, TStatusOrder } from "@/interface/Utils";
import { orderAll, orderCreate, orderDelete, orderId, orderUpdate } from "@/network/order";
import { orderTransactionSanitize } from "@/sanitize/orderSanitize";
import { toFetch } from "@/hook/toFetch";
import { useDeliveryStore } from "@/store/delivery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePaymentStore } from "@/store/payment";
import { useProductStore } from "@/store/product";
import { useReceiverStore } from "@/store/receiver";
import { useRouter } from "next/navigation";

export function useOrder() {
    const router = useRouter();
    const product = useProductStore();
    const delivery = useDeliveryStore()
    const receiver = useReceiverStore()
    const payment = usePaymentStore()

    const onUpsert = useMutation({
        onMutate: () => {
            return { toastId: toast.loading('Loading...') }
        },
        onSettled: (_, __, ___, context) => {
            if (context) {
                toast.dismiss(context.toastId)
            }
        },
        mutationFn: ({ data, method, id }: {
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
            const sanitize = orderTransactionSanitize({
                product: product.productStore,
                payment: payment.payment,
                delivery: delivery.delivery,
                receiver: receiver.receiver,
                order: data,
            })
            // console.log(sanitize)
            if (method === 'PUT' && id) {
                return orderUpdate(sanitize, id)
            } else {
                return orderCreate(sanitize)
            }
        },
        onError: (data, variables, context) => {
            if (data instanceof Error) {
                toast.error(data.message)
            }
        },
        onSuccess: (data, variables, context) => {
            toast.success(data.msg)
            product.reset()
            delivery.reset()
            receiver.reset()
            payment.reset()
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
            queryKey: [ ORDER.KEY, filter?.name ?? '', filter?.status ?? '' ],

        })
    }
    const GetId = (id: string) => {
        return useQuery({
            queryKey: [ ORDER, id ],
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
    //
    const GetOrderStatus = (status: TStatusOrder) => useQuery({
        queryKey: [ ORDER, status ],
        queryFn: () => {
            return toFetch<number>('GET', {
                url: `/order/count?status=${ status }`,
                cacheData: {
                    // cache: 'default',
                    next: {
                        revalidate: 60,
                        // tags: [ 'cached',status ]
                    }
                }
            })
        },
        select: (response) => response.data,
        gcTime: 5 * 60 * 1000,
        refetchOnMount: false,
        // initialData:()=> ({
        //     data:0
        // })
    })
    //

    // const GetOrderStatus =  (status: TStatusOrder) => {
    //     return toFetch<number>('GET', {
    //         url: `/order/count?status=${ status }`,
    //         cacheData: {
    //             // cache: 'default',
    //             next: {
    //                 revalidate: 60,
    //                 // tags: [ 'cached',status ]
    //             }
    //         }
    //     }).then(response => {
    //         // console.log(response)
    //         return response.data
    //     })
    //
    //     // initialData:()=> ({
    //     //     data:0
    //     // })
    // }

    return {
        getOrderStatus: GetOrderStatus,
        onUpsert,
        getAll: GetAll,
        getId: GetId,
        onDelete
    }
}
