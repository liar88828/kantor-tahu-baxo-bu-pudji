import { Users } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { TTrolleyDB, TTrolleyProductDB } from "@/interface/entity/trolley.model";
import { TProductDB } from "@/interface/entity/product.model";
import { useState } from "react";

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

export const useTrolley = () => {
	const queryClient = useQueryClient()
	const [ counter, setCounter ] = useState(1)
	const [ message, setMessage ] = useState<string | null>()

	const GetAll = ({ idUser }: TrolleyParams) => {
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
	const GetId = ({ idTrolley }: IdTrolley) => {
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

	const incrementProduct = () => {
		setCounter(prev => {
			return prev + 1
		})
	}

	const decrementProduct = () => {
		setCounter(prev => {
			if (prev !== 0) {
				setMessage(null)
				return prev - 1
			}
			setMessage('The stock cannot be less than 0')
			return prev
		})
	}
	const push = useMutation({
		onMutate: () => {
			return toast.loading('Loading...')
		},
		mutationFn: async (product: TProductDB) => {
			return {
				data: await pushTrolley({ id: product.id, price: product.price, qty: counter })
			}

		},
		onError: (error) => {
			toast.error(error.message)
		},
		onSuccess: async (data,) => {
			toast.success('Success Push Data ', { position: 'top-right' })
			await queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley ] })
			await queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley, TROLLEY_KEYS.count ] })
		},
		onSettled: async (_,
						  __,
						  ___,
						  context) => {
			toast.dismiss(context)
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

	const Count = () => {
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

	const GetIdTrolley = () => {
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

	return {
		count: Count,
		increment,
		decrement,
		push,
		// setCounter,
		getAll: GetAll,
		GetId,
		remove,
		GetIdTrolley,
		setIdTrolley,
		message,
		decrementProduct,
		incrementProduct, counter
	}
}

// const test=useMutationState({
// 	filters:{
// 		mutationKey:[TROLLEY_KEYS.trolley,TROLLEY_KEYS.order]
// 	},
// 	select:(mutate: Mutation)=>mutate.state.data,
// })