'use client'
import React from 'react'
import useTrolleyStore from "@/store/trolley";
import { LoadingDataList } from "@/app/components/LoadingData";
import { PageEmptyData, PageErrorData } from "@/app/components/PageErrorData";
import { TrolleyCardPageUser } from "@/app/components/trolley/trolley.page";
import { useTrolley } from "@/hook/useTrolley";

export default function Page() {
    const { getAll, increment, decrement, remove, } = useTrolley()
    const { data: stateTrolley, isError, isFetching } = getAll()
    const { setSelected, isTrolleyIncluded, onIncrement, onDecrement } = useTrolleyStore()
    if (isFetching) return <LoadingDataList />
    if (!stateTrolley || isError) return <PageErrorData />
    if (stateTrolley.data.length === 0) {
        return (
            <div className={ 'flex w-full justify-center' }>
                <PageEmptyData page={ 'Trolley' } />
            </div>
        )
    }
    return stateTrolley.data.map((trolley) => (
            <TrolleyCardPageUser
                key={ trolley.id }
                trolley={ trolley }
                isTrolleyIncluded={ isTrolleyIncluded(trolley.id) }
                onSelectAction={ () => setSelected(trolley) }
                onRemoveAction={ () => remove.mutate({ idTrolley: trolley.id }) }
                onIncrementAction={ () => {
                    increment.mutate({ idTrolley: trolley.id })
                    onIncrement(trolley.id)
                } }
                onDecrementAction={ () => {
                    decrement.mutate({ idTrolley: trolley.id })
                    onDecrement(trolley.id)
                }
                }
            />
        )
    )
}
