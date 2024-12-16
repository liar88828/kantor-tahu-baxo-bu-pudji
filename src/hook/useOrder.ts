'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import { TOrderTransactionCreate } from "@/interface/entity/transaction.model";
import { orderGet, orderPost } from "@/network/order";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export enum ORDER_KEY {
	order = "order",
}

export function useOrder() {
	const router = useRouter();
	const onCreate = useMutation({
		mutationFn: (data: TOrderTransactionCreate) => {

			return orderPost(data)
		},
		onError: (data, variables, context) => {
			if (data instanceof Error) {
				toast.error(data.message)
			}
		},
		onSuccess: (data, variables, context) => {
			console.log(data)
			toast.success(data.msg)
			router.push('/admin/order')
		},
	})
	const GetAll = () => {
		return useQuery({
			queryFn: orderGet,
			queryKey: [ ORDER_KEY.order ],

		})
	}
	return {
		onCreate,
		getAll: GetAll
	}
}
