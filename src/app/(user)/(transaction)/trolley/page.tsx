'use client'
import React from 'react'
import { Minus, Plus, Trash } from 'lucide-react'
import { toRupiah } from '@/utils/toRupiah'
import { useTrolley } from "@/store/useTrolley";
import { ErrorData } from "@/app/components/ErrorData";
import { LoadingDataList } from "@/app/components/LoadingData";
import { useQueryClient } from "@tanstack/react-query";
import { userId } from "@/network/trolley";
import { TOrderProductList } from "@/entity/transaction.model";
import useTrolleyStore from "@/store/trolley";

export default function Page() {
	const queryClient = useQueryClient()
	const { getAll, increment, decrement, remove, } = useTrolley(queryClient)
	const { data: stateTrolley, error, isFetching } = getAll({ idUser: userId })
	const { setSelected, onSelected } = useTrolleyStore()
	function onIncrement(idTrolley: string) {
		increment.mutate({ idTrolley });
	}

	function onDecrement(idTrolley: string) {
		decrement.mutate({ idTrolley });
	}

	function onRemove(idTrolley: string) {
		remove.mutate({ idTrolley });
	}

	const isTrolleyIncluded = (id: string) => {
		return onSelected.some((trolley) => trolley.id === id);
	};

	function onSelect(dataProduct: TOrderProductList) {
		setSelected(dataProduct)
	}
	return (
		<div className='p-3'>

			<div className="space-y-2">
				{ (isFetching)
					? <LoadingDataList/>
					: (!stateTrolley || (error))
						? <ErrorData/>
						: stateTrolley.data.map(trolley => (
							<div key={ trolley.id }
								 className={ `card card-side card-compact bg-base-300 card-bordered ${ isTrolleyIncluded(trolley.id) ? 'border-success' : '' }` }>
								<figure onClick={ () => onSelect(trolley) }>
									{/* eslint-disable-next-line @next/next/no-img-element */ }
							<img
								src="https://picsum.photos/200/300?random=1"
								alt="Movie"
								className='rounded-xl object-cover w-32 h-32 '
							/>
						</figure>
						<div className="card-body">
							<div className="flex justify-between">
								<h2 className='card-title'>Lorem, ipsum dolor.</h2>
								<button
									onClick={ () => onRemove(trolley.id) }
									className=' btn btn-square btn-error btn-sm '>
									<Trash/>
								</button>
							</div>
							<div className="flex justify-between items-end">
								<div className="">
									<p>{ toRupiah(trolley.Product.price) }</p>
									<p>{ trolley.Product.type }</p>
								</div>
								<div className="flex items-center gap-2">
									<button
										onClick={ () => onIncrement(trolley.id) }
										className="btn btn-square btn-sm">
										<Plus/>
									</button>
									<h2>{ trolley.qty }</h2>
									<button onClick={ () => onDecrement(trolley.id) }
											className="btn btn-square  btn-sm">
										<Minus/>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}

			</div>


		</div>
	)
}


