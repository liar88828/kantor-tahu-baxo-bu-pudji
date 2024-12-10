'use client'
import React, { useState } from 'react'
import { Minus, Plus, Trash } from 'lucide-react'
import { toRupiah } from '@/utils/toRupiah'
import { TROLLEY_KEY, useTrolley } from "@/store/useTrolley";
import { ErrorData } from "@/app/components/ErrorData";
import { LoadingDataList } from "@/app/components/LoadingData";
import { useQueryClient } from "@tanstack/react-query";
import { userId } from "@/network/trolley";

export default function Page() {
	const queryClient = useQueryClient()
	const { getAll, increment, decrement, remove } = useTrolley(queryClient)
	const { data: stateTrolley, error, isFetching } = getAll({ idUser: userId })
// State for managing selection
	const [selectedTrolleys, setSelectedTrolleys] = useState<{ [key: string]: boolean }>({})

	function onIncrement(idTrolley: string) {
		increment.mutate({ idTrolley });
	}

	function onDecrement(idTrolley: string) {
		decrement.mutate({ idTrolley });
	}

	function onRemove(idTrolley: string) {
		remove.mutate({ idTrolley });
	}


	function onSelect(idTrolley: string) {
		setSelectedTrolleys((prev) => ({
			...prev,
			[idTrolley]: !prev[idTrolley],
		}));
		queryClient.setQueryData([TROLLEY_KEY, 'SELECT'], selectedTrolleys)
		const data =
			queryClient.getQueryData([ TROLLEY_KEY, 'SELECT' ])
		// console.log(data)
		// console.log(idTrolley);
		// queryClient.setQueriesData({
		// 		queryKey: [TROLLEY_KEY, { idUser: userId }]
		// 	},
		// 	(oldData: any) => {
		// 		if (!oldData) return oldData;
		// 		console.log(oldData);
		//
		// 		return {
		// 			...oldData,
		// 			data: oldData.data.map((trolley: any) =>
		// 				trolley.id === idTrolley
		// 					? { ...trolley, isSelected: !trolley.isSelected }
		// 					: trolley
		// 			),
		// 		};
		// 	});
	}
	return (
		<div className='p-3'>
			<div className="space-y-2">
				{ (isFetching)
					? <LoadingDataList/>
					: (!stateTrolley || (error))
						? <ErrorData/>
						: stateTrolley.data.map(trolley => (
					<div

						key={ trolley.id }
						onClick={ () => onSelect(trolley.id) }
						className={ `card card-side card-compact bg-base-300 card-bordered ${
							selectedTrolleys[trolley.id] ? 'border-success' : ''

							// @ts-ignore
							// trolley.isSelected ? 'border-success' : ''
						}` }
					>
						<figure>
							{/* eslint-disable-next-line @next/next/no-img-element */}
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
									<p>Pedas</p>
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

