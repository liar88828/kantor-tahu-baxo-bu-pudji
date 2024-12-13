/* eslint-disable react-hooks/rules-of-hooks */
import { Users } from "@prisma/client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
	pushTrolley,
	removeTrolley,
	trolleyAll,
	trolleyCount,
	trolleyDecrement,
	trolleyId,
	trolleyIncrement
} from "@/network/trolley";
import toast from "react-hot-toast";
import { TTrolleyDB, TTrolleyProductDB } from "@/entity/trolley.model";

// export const TROLLEY_KEY = 'trolley'

export enum TROLLEY_KEYS {
	trolley = "trolley",
	count = "count",
	selected = "selected",
	counter = "counter",
	order = 'order'

}
export type TrolleyParams = { idUser: Users['id'] };
export type IdTrolley = { idTrolley: TTrolleyDB['id'] };

export type Counter = {
	idTrolley: TTrolleyDB['id'],
};

export const useTrolley = (queryClient: QueryClient) => {

	const getAll = ({idUser}: TrolleyParams) => {
		return useQuery({
			queryKey: [ TROLLEY_KEYS.trolley ],
			queryFn: () => {
				try {
					return trolleyAll({ idUser })
				} catch (error) {
					if (error instanceof Error) {
						toast.error(error.message);
					}
				}
			},
			select: (context) => {
				if (context) {
					return context.data
				}
			},

			// throwOnError: (error) => {
			// 	error
			// },
		})
	}

	const getId = ({ idTrolley }: IdTrolley) => {
		return useQuery({
			queryKey: [ TROLLEY_KEYS.trolley ],
			queryFn: () => {
				try {
					return trolleyId(idTrolley)
				} catch (error) {
					if (error instanceof Error) {
						toast.error(error.message);
					}
				}
			}
		})
	}

	const push = useMutation({
			mutationFn: pushTrolley,
		onError: (error, variables, context) => {
			toast.error(error.message)
		},
		onSuccess: (data, variables, context) => {
			toast.success('Success Push Data ', { position: 'top-right' })
			queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley ] })
			queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley, TROLLEY_KEYS.count ] })
		}
	})

	const remove = useMutation({

			mutationFn: removeTrolley,
		onError: (error, variables, context) => {
			console.log(error.message);
			console.log(variables.idTrolley);
			toast.error(`Error on : increment id ${ variables.idTrolley }`);
		},
		onSuccess: (data, variables,) => {
			toast.success(`Success on : increment id ${ variables.idTrolley }`, { position: 'top-right' });
			queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley ] })
			queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley, TROLLEY_KEYS.count ] })
			}
	})

	const increment = useMutation({
		mutationFn: trolleyIncrement,
		onError: (error, variables, context) => {
			console.log(error.message);
			console.log(variables.idTrolley);
			toast.error(`Error on : increment id ${ variables.idTrolley }`);
		},
		onSuccess: (data, variables, context) => {
			toast.success(`Success on : increment id ${ variables.idTrolley }`, { position: 'top-right' });
			queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley ] });
			// queryClient.invalidateQueries({ queryKey: [TROLLEY_KEY, variables.idTrolley] });
		},
	})

	const decrement = useMutation({
		mutationFn: trolleyDecrement,
		onError: (error, variables, context) => {
			console.log(error.message);
			console.log(variables.idTrolley);
			toast.error(`Error on : increment id ${ variables.idTrolley }`);
		},
		onSuccess: (data, variables) => {
			toast.success(`Success on : increment id ${ variables.idTrolley }`, { position: 'top-right' });
			// console.info('Success:', data);
			queryClient.invalidateQueries({ queryKey: [ TROLLEY_KEYS.trolley ], });

			// queryClient.invalidateQueries({
			// 	queryKey: [TROLLEY_KEY, idTrolley]
			// });
		},
	})

	const count = () => {
		const { data } = useQuery({
				queryKey: [ TROLLEY_KEYS.trolley, TROLLEY_KEYS.count ],
			queryFn: () => {
				try {
					return trolleyCount()
				} catch (error) {
					if (error instanceof Error) {
						toast.error(error.message);
					}
				}
			},
				// networkMode: 'always',
			}
		)
		if (data) {
			return data.data
		} else {
			return 0
		}
	}

	const getIdTrolley = () => {
		return useQuery<TTrolleyProductDB[]>({
			queryKey: [ TROLLEY_KEYS.trolley, TROLLEY_KEYS.order ],
			queryFn: () => {
				const data = sessionStorage.getItem(`${ TROLLEY_KEYS.trolley }_${ TROLLEY_KEYS.selected }`)
				if (data) {
					return JSON.parse(data)
				} else {
					// throw new Error('Data is Not Found')
					return []
				}
			}
		})
	}

	const setIdTrolley = useMutation({
		mutationKey: [ TROLLEY_KEYS.trolley, TROLLEY_KEYS.order ],
		mutationFn: async (data: TTrolleyProductDB[]) => {
			sessionStorage.setItem(`${ TROLLEY_KEYS.trolley }_${ TROLLEY_KEYS.selected }`, JSON.stringify(data))
			return true
		},

	})

	return { count: count(), increment, decrement, push, getAll, getId, remove, getIdTrolley, setIdTrolley }
}

// const test=useMutationState({
// 	filters:{
// 		mutationKey:[TROLLEY_KEYS.trolley,TROLLEY_KEYS.order]
// 	},
// 	select:(mutate: Mutation)=>mutate.state.data,
// })