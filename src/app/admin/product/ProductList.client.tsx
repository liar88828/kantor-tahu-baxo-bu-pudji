'use client'
import React from 'react'
import {Pen, Plus, Trash} from 'lucide-react'
import {Rupiah} from '@/utils/rupiah'
import Link from 'next/link'
import {TProductDB} from "@/entity/product.model";
import {productDelete} from "@/network/product";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {ErrorData} from "@/app/components/ErrorData";

export default function ProductList({products}: { products: TProductDB[] }) {
	const router = useRouter()

	const onDelete = async (id: string) => {
		const idToast = toast.loading('Delete Data API')
		try {
			await productDelete(id)
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
				<Link href={'/admin/product/create'} className='btn btn-square'>
					<Plus/>
				</Link>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-20 ">
				{
					products.length === 0
						? <ErrorData code={404} msg={'Data Payment is Empty'}/>
						: products.map(product => (
							<div
								key={product.id}
								className="card card-side card-compact bg-base-300 ">
								<figure className={'p-1'}
										onClick={() => router.push(`/admin/product/${product.id}`)}
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src="https://picsum.photos/200/300?random=1"
										alt="Movie"
										className='rounded-xl object-cover w-32 h-32 '
									/>
								</figure>
								<div className="card-body">
									<div className="flex justify-between h-full">
										<h2 className='card-title'>{product.name}</h2>
									</div>
									<div className="flex justify-between items-end">
										<div className="">
											<p>{Rupiah(product.price)}</p>
											<p>{product.type}</p>
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={() => onDelete(product.id)}
												className=' btn btn-square btn-error btn-sm '>
												<Trash/>
											</button>
											<Link
												href={`/admin/product/update/${product.id}`}
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
