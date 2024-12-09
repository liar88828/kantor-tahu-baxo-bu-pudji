/* eslint-disable react-hooks/rules-of-hooks */
import { Users } from "@prisma/client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
	pushTrolley,
	removeTrolley,
	trolleyAll,
	trolleyDecrement,
	trolleyId,
	trolleyIncrement
} from "@/network/trolley";
import { TOrderProductDB, TOrderProductList } from "@/entity/transaction.model";
import { ResponseAll } from "@/interface/server/param";

export const TROLLEY_KEY = 'trolley'
export type TrolleyParams = { idUser: Users['id'] };
export type IdTrolley = { idTrolley: TOrderProductDB['id'] };

export type Counter = {
	idTrolley: TOrderProductDB['id'],
};

export const useTrolley = (queryClient: QueryClient) => {
	const getAll = ({idUser}: TrolleyParams) => {
		return useQuery({
			queryKey: [TROLLEY_KEY],
			queryFn: () => trolleyAll({idUser}),
			select:(context)=>context.data
		})
	}

	const getId = async ({idTrolley}: IdTrolley) => {
		return useQuery({
			queryKey: [TROLLEY_KEY],
			queryFn: () => trolleyId(idTrolley)
		})
	}

	const push = useMutation({
			mutationFn: pushTrolley,
		onSuccess: () => {

				queryClient.refetchQueries({queryKey: [TROLLEY_KEY]})
			// queryClient.refetchQueries({queryKey: [TROLLEY_KEY,]})
			}
	})

	const remove = useMutation({
			mutationFn: removeTrolley,
		onSuccess: () => {
			// console.log(data)
			// console.log(variables)
			// console.log(context)
				queryClient.refetchQueries({queryKey: [TROLLEY_KEY]})
			// queryClient.refetchQueries({queryKey: [TROLLEY_KEY]})
			}
	})

	const increment = useMutation({
		mutationFn: trolleyIncrement,
		onError: () => {},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: [TROLLEY_KEY] });
			// queryClient.invalidateQueries({ queryKey: [TROLLEY_KEY, variables.idTrolley] });
		},
	})

	const decrement = useMutation({
		mutationFn: trolleyDecrement,
		onError: () => {
		},

		onSuccess: (data) => {
			console.info('Success:', data);
			queryClient.refetchQueries({
				queryKey: [TROLLEY_KEY],


			});
			// queryClient.invalidateQueries({
			// 	queryKey: [TROLLEY_KEY, idTrolley]
			// });
		},
	})

	const count = () => {
		const state = queryClient.getQueryState<{ data: ResponseAll<TOrderProductList> }>([TROLLEY_KEY])
		if (state) {
			if (state.status === 'success') {
				if (state.data) {
					// console.info('Count:', )
					return state.data.data.data.length
				}
			}
		} else {
			queryClient.invalidateQueries({ queryKey: [TROLLEY_KEY] })
		}
		return 0
	}
	return {count: count(), increment, decrement, push, getAll, getId, remove}
}
