'use client'
import React from 'react'
import {Minus, Plus, Trash} from 'lucide-react'
import {Rupiah} from '@/utils/rupiah'
import {useTrolley} from "@/store/useTrolley";
import {ErrorData} from "@/app/components/ErrorData";
import {LoadingData} from "@/app/components/LoadingData";
import {useQueryClient} from "@tanstack/react-query";


export default function Page() {
	const {getAll, increment, decrement} = useTrolley(useQueryClient())
	const {data: stateTrolley, error, isFetching} = getAll({idUser: 'asdasda'})

	if (error || !stateTrolley) return <ErrorData/>
	if (isFetching) return <LoadingData/>

	function onIncrement(id: string) {
		return increment({idTrolley: id,});
	}

	function onDecrement(id: string) {
		return decrement({idTrolley: id});
	}

	return (
		<div className='p-3'>
			<div className="space-y-2">
				{stateTrolley.data.map(d => (
					<div
						key={d.id}
						className="card card-side card-compact bg-base-300 ">
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
								<button className=' btn btn-square btn-error btn-sm '>
									<Trash/>
								</button>
							</div>
							<div className="flex justify-between items-end">
								<div className="">
									<p>{Rupiah(20000)}</p>
									<p>Pedas</p>
								</div>
								<div className="flex items-center gap-2">
									<button
										onClick={() => onIncrement(d.id)}
										className="btn btn-square btn-sm">
										<Plus/>
									</button>
									<h2>{d.qty}</h2>
									<button onClick={() => onDecrement(d.id)}
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
