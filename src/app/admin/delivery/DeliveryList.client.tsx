'use client'
import React from 'react'
import { Pen, Plus, Trash } from 'lucide-react'
import { toRupiah } from '@/utils/toRupiah'
import Link from 'next/link'
import { TDeliveryDB } from "@/entity/delivery.model";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deliveryAll, deliveryDelete } from "@/network/delivery";
import { ErrorData } from "@/app/components/ErrorData";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpin } from "@/app/components/LoadingData";

interface DeliveryListProps {
	deliverys: TDeliveryDB[]
}

export default function DeliveryList() {
	const { data: deliverys } = useQuery({ queryKey: [ 'delivery' ], queryFn: () => deliveryAll() })

	const router = useRouter()
	const onDelete = async (id: string) => {
		const idToast = toast.loading('Delete Data API')
		try {
			await deliveryDelete(id)
			toast.success('Success Delete Data');
			router.refresh()
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message)
				toast.error(e.message);
			}
			toast.error('something error');

		} finally {
			toast.dismiss(idToast)
		}
	}
	return (
		<div className='p-3'>
			<div className="flex justify-between my-4 gap-3">
				<input type="text" className='input input-bordered w-full' placeholder='search...'/>
				<Link href={'/admin/delivery/create'} className='btn btn-square'>
					<Plus/>
				</Link>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-20 ">
				{ !deliverys
					? <LoadingSpin/>
					: deliverys.data.data.length === 0
						? <ErrorData code={404} msg={'Data Delivery is Empty'}/>
						: deliverys.data.data.map(delivery => (
							<div
								key={delivery.id}
								className="card card-side card-compact bg-base-300 ">
								<figure className={'p-1'}>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src="https://picsum.photos/200/300?random=1"
										alt="Movie"
										className='rounded-xl object-cover w-32 h-32 '
									/>
								</figure>
								<div className="card-body">
									<div className="flex justify-between h-full">
										<h2 className='card-title'>{delivery.name}</h2>
									</div>
									<div className="flex justify-between items-end">
										<div className="">
											<p>{ toRupiah(delivery.price) }</p>
											<p>{delivery.address}</p>
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={() => onDelete(delivery.id)}
												className=' btn btn-square btn-error btn-sm '>
												<Trash/>
											</button>
											<Link href={`/admin/delivery/update/${delivery.id}`}
												  className=' btn btn-square btn-info btn-sm '>
												<Pen/>
											</Link>
										</div>
									</div>
								</div>
							</div>
						))}

			</div>
		</div>
	)
}
