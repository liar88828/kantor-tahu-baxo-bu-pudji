import toast from "react-hot-toast";
import { ResponseAll } from "@/interface/server/param";
import { TProductDB } from "@/interface/entity/product.model";
import { TTrolleyDB, TTrolleyProductUser } from "@/interface/entity/trolley.model";
import { Users } from "@prisma/client";
import { useMutation, useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    pushTrolley,
    removeTrolley,
    trolleyAll,
    trolleyCount,
    trolleyDecrement,
    trolleyId,
    trolleyIncrement
} from "@/network/trolley";

export enum TROLLEY_KEYS {
    trolley = "trolley",
    count = "trolleyCount",
    selected = "trolleySelected",
    counter = "trolleyCounter",
    order = 'trolleyOrder'

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

    const GetAll = () => {
        return useQuery({
            queryKey: [ TROLLEY_KEYS.trolley ],
            queryFn: trolleyAll,
            select: (context) => {
                if (context) {
                    return {
                        data: context.data.data,
                        count: context.data.data.length
                    }
                }
            },
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
            return {
                toast: toast.loading('Loading...',
                    { position: 'top-left' })
            }
        },
        mutationFn: async (product: TProductDB) => {
            return pushTrolley({ id: product.id, price: product.price, qty: counter })
        },
        onError: (error) => {
            toast.error(error.message,
                { position: 'top-left' })
        },
        onSuccess: async () => {
            toast.success('Success Push Data ',
                { position: 'top-left' })
            await queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley ] })
            await queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley, TROLLEY_KEYS.count ] })
        },
        onSettled: async (_,
                          __,
                          ___,
                          context) => {
            toast.dismiss(context?.toast)
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
            toast.success(`Success on : increment id ${ variables.idTrolley }`);
            // noinspection JSIgnoredPromiseFromCall
            queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley ] })
            // noinspection JSIgnoredPromiseFromCall
            queryClient.refetchQueries({ queryKey: [ TROLLEY_KEYS.trolley, TROLLEY_KEYS.count ] })
        }
    })

    const increment = useMutation({
        mutationFn: trolleyIncrement,
        mutationKey: [ TROLLEY_KEYS.counter ],
        onError: (error, variables, context: any) => {
            toast.error(`Error on : increment id ${ variables.idTrolley }`);
            queryClient.setQueryData([ TROLLEY_KEYS.trolley ], context.previousTodos)
        },
        onSuccess: (data, variables, context) => {
            toast.success(`Success on : increment id ${ variables.idTrolley }`);
        },
        onMutate: async (context) => {
            // console.log(context)
            await queryClient.cancelQueries({ queryKey: [ TROLLEY_KEYS.trolley ] })
            const previousTodos = queryClient.getQueryData([ TROLLEY_KEYS.trolley ])
            queryClient.setQueryData<{ data: ResponseAll<TTrolleyProductUser> }>(
                [ TROLLEY_KEYS.trolley ],
                (old) => {
                    if (old) {
                        // console.log('new data', newData)
                        // console.log('prev data', previousTodos)
                        old.data.data = old.data.data.map((trolley) => {
                            if (trolley.id === context.idTrolley) {
                                trolley.qty_at_buy = trolley.qty_at_buy + 1
                            }
                            return trolley;
                        })
                        return old
                    }

                })
            return { previousTodos }
        },
        onSettled: () => {
            console.log('is revalidate')
            // noinspection JSIgnoredPromiseFromCall
            queryClient.invalidateQueries({ queryKey: [ TROLLEY_KEYS.trolley ] });
        }
    })

    const variables = useMutationState({
        filters: { mutationKey: [ TROLLEY_KEYS.counter ], status: 'pending' },
        select: (mutation) => {
            return mutation.state.variables
        },
    })

    const decrement = useMutation({
        mutationFn: trolleyDecrement,
        onError: (error, variables, context) => {
            // console.log(error.message);
            // console.log(variables.idTrolley);
            toast.error(`Error on : increment id ${ variables.idTrolley }`);
        },
        onSuccess: (data, variables) => {
            toast.success(`Success on : increment id ${ variables.idTrolley }`);
        },
        onSettled: () => {
            // noinspection JSIgnoredPromiseFromCall
            queryClient.invalidateQueries({ queryKey: [ TROLLEY_KEYS.trolley ], });

        }
    })

    const Count = () => {
        return useQuery({
            queryKey: [ TROLLEY_KEYS.trolley, TROLLEY_KEYS.count ],
            queryFn: trolleyCount,
            select: (response): number => {
                if (response) {
                    return response.data

                }
                return 0;
            }
        })
    }

    const GetIdTrolley = () => {
        return useQuery<TTrolleyProductUser[]>({
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
        mutationFn: async (data: TTrolleyProductUser[]) => {
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
