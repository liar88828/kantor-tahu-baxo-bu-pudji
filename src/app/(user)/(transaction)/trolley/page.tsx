'use client'
import React from 'react'
import { Minus, Plus, Trash } from 'lucide-react'
import { toRupiah } from '@/utils/toRupiah'
import { useTrolley } from "@/hook/useTrolley";
import { EmptyData, ErrorData } from "@/app/components/ErrorData";
import { LoadingDataList } from "@/app/components/LoadingData";
import useTrolleyStore from "@/store/trolley";

export default function Page() {
	const { getAll, increment, decrement, remove, } = useTrolley( )
    const { data: stateTrolley, isError, isFetching } = getAll()
    const { setSelected, isTrolleyIncluded, onIncrement, onDecrement } = useTrolleyStore()

    if (isFetching) return <LoadingDataList/>
    if (!stateTrolley || isError) return <ErrorData/>
    if (stateTrolley.data.length === 0) return <div className={ 'flex w-full justify-center' }><EmptyData
        page={ 'Trolley' }/></div>

    return stateTrolley.data.map(trolley => (
        <div
            key={ trolley.id }
            className={ `card card-side card-compact bg-base-300 card-bordered ${ isTrolleyIncluded(trolley.id) ? 'border-neutral' : '' }` }>
            <figure onClick={ () => setSelected(trolley) }>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt="Movie"
                    className='rounded-xl object-cover w-32 h-32 '
                />
            </figure>
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className='card-title'>{ trolley.Product.name }</h2>
                    <button
                        onClick={ () => remove.mutate({ idTrolley: trolley.id }) }
                        className=' btn btn-square btn-error btn-sm '>
                        <Trash/>
                    </button>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p>{ toRupiah(trolley.Product.price) }</p>
                        <p>{ trolley.Product.type }</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={ () => {
                                increment.mutate({ idTrolley: trolley.id })
                                onIncrement(trolley.id)
                            } }
                            className="btn btn-square btn-sm">
                            <Plus/>
                        </button>
                        <h2>{ trolley.qty_at_buy }</h2>
                        <button onClick={ () => {
                            decrement.mutate({ idTrolley: trolley.id })
                            onDecrement(trolley.id)
                        } }
                                className="btn btn-square  btn-sm">
                            <Minus/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ))
}


