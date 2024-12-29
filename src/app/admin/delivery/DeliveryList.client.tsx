'use client'
import React from 'react'
import { Pen, Plus, Trash } from 'lucide-react'
import { toRupiah } from '@/utils/toRupiah'
import Link from 'next/link'
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { ErrorData } from "@/app/components/ErrorData";
import { LoadingSpin } from "@/app/components/LoadingData";
import { useDelivery } from "@/hook/useDelivery";

export default function DeliveryList() {
	const { onDelete, getAll } = useDelivery()
	const { data: deliverys } = getAll()
	return (
		<div className='p-3'>
			<div className="flex justify-between my-4 gap-3">
				<input type="text" className='input input-bordered w-full' placeholder='search...'/>
				<Link href={'/admin/delivery/create'} className='btn btn-square'>
					<Plus/>
				</Link>
			</div>
			{ !deliverys ? <LoadingSpin/> : deliverys.data.data.length === 0
				? <ErrorData code={ 404 } msg={ 'Data Delivery is Empty' }/>
				: <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mb-20 ">
					{ deliverys.data.data.map(delivery => (
						<DeliveryCard
							key={ delivery.id }
							delivery={ delivery }
							onClick={ () => onDelete(delivery.id) }/>
					)) }
				</div>
			}
		</div>
	)
}

export function DeliveryCard(props: { delivery: TDeliveryDB, onClick: () => Promise<void> }) {
	return <div

		className="card card-side card-compact bg-base-300 ">
		<figure className={ "p-1" }>
			{/* eslint-disable-next-line @next/next/no-img-element */ }
			<img
				src="https://picsum.photos/200/300?random=1"
				alt="Movie"
				className="rounded-xl object-cover w-32 h-32 "
			/>
		</figure>
		<div className="card-body">
			<div className="flex justify-between h-full">
				<h2 className="card-title">{ props.delivery.name }</h2>
			</div>
			<div className="flex justify-between items-end">
				<div className="">
					<p>{ toRupiah(props.delivery.price) }</p>
					<p>{ props.delivery.address }</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={ props.onClick }
						className=" btn btn-square btn-error btn-sm ">
						<Trash/>
					</button>
					<Link href={ `/admin/delivery/update/${ props.delivery.id }` }
						  className=" btn btn-square btn-info btn-sm ">
						<Pen/>
					</Link>
				</div>
			</div>
		</div>
	</div>;
}
