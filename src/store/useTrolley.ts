/* eslint-disable react-hooks/rules-of-hooks */
import {Users} from "@prisma/client";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {pushTrolley, removeTrolley, trolleyAll, trolleyDecrement, trolleyId, trolleyIncrement} from "@/network/trolley";
import {TOrderProductDB} from "@/entity/transaction.model";

export const TROLLEY_KEY = 'trolley'
export type TrolleyParams = { idUser: Users['id'] };
type IdTrolley = { idTrolley: TOrderProductDB['id'] };

export type Counter = {
	idTrolley: TOrderProductDB['id'],
};

export const useTrolley = (queryClient: QueryClient) => {
	const getAll = ({idUser}: TrolleyParams) => {
		return useQuery({
			queryKey: [TROLLEY_KEY],
			queryFn: () => trolleyAll({idUser})
		})
	}

	const getId = async ({idTrolley}: IdTrolley) => {
		return useQuery({
			queryKey: [TROLLEY_KEY],
			queryFn: () => trolleyId(idTrolley)
		})
	}

	const push = async ({idTrolley}: IdTrolley) => {
		await useMutation({
			mutationFn: pushTrolley,
			onSuccess: () => {
				queryClient.refetchQueries({queryKey: [TROLLEY_KEY]})
				queryClient.refetchQueries({queryKey: [TROLLEY_KEY,]})
			}
		}).mutateAsync(idTrolley)
	}

	const remove = async ({idTrolley}: IdTrolley) => {
		await useMutation({
			mutationFn: removeTrolley,
			onSuccess: () => {
				queryClient.refetchQueries({queryKey: [TROLLEY_KEY]})
				queryClient.refetchQueries({queryKey: [TROLLEY_KEY,]})
			}
		}).mutateAsync(idTrolley)
	}

	const increment = ({idTrolley}: Counter) => useMutation({
		mutationFn: trolleyIncrement,
		onError: () => {

		},
		onSuccess: (data) => {
			console.info('Success:', data);
			queryClient.refetchQueries({
				queryKey: [TROLLEY_KEY]
			});
			queryClient.invalidateQueries({
				queryKey: [TROLLEY_KEY, idTrolley]
			});
		},
	}).mutate(idTrolley)

	const decrement = ({idTrolley}: Counter) => useMutation({
		mutationFn: trolleyDecrement,
		onError: () => {
		},

		onSuccess: (data) => {
			console.info('Success:', data);
			queryClient.refetchQueries({
				queryKey: [TROLLEY_KEY],


			});
			queryClient.invalidateQueries({
				queryKey: [TROLLEY_KEY, idTrolley]
			});
		},
	}).mutate(idTrolley)

	const count = () => {
		const state = queryClient.getQueryState<TOrderProductDB[]>([TROLLEY_KEY])
		if (state) {
			if (state.status === 'success') {
				if (state.data) {
					return state.data.length
				}
			}
		}
		return 0
	}
	return {count: count(), increment, decrement, push, getAll, getId, remove}
}
