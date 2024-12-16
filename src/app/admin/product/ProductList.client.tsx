'use client'
import React from 'react'
import { Pen, Plus, Trash } from 'lucide-react'
import { toRupiah } from '@/utils/toRupiah'
import Link from 'next/link'
import { TProductDB } from "@/interface/entity/product.model";
import { ErrorData } from "@/app/components/ErrorData";
import { useProduct } from "@/hook/useProduct";

export default function ProductList({products}: { products: TProductDB[] }) {

	const { onDelete } = useProduct()

	return (
		<div className='p-3'>
			<div className="flex justify-between my-4 gap-3">
				<input type="text" className='input input-bordered w-full' placeholder='search...'/>
				<Link href={'/admin/product/create'} className='btn btn-square'>
					<Plus/>
				</Link>
			</div>
			{
				products.length === 0
					? <ErrorData code={ 404 } msg={ 'Data Payment is Empty' }/>
					: <div
						className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mb-20 ">
						{ products.map(product => (
							<ProductCard
								key={ product.id }
								onClick={ () => onDelete(product.id) }
								product={ product }/>)) }
					</div>

			}
		</div>
	)
}

export function ProductCard(props: { product: TProductDB, onClick: () => Promise<void> }) {
	return <div

		className="card card-side card-compact bg-base-300 ">
		<Link className={ "p-1" }
			  href={ `/admin/product/${ props.product.id }` }
		>
			{/* eslint-disable-next-line @next/next/no-img-element */ }
			<img
				src="https://picsum.photos/200/300?random=1"
				alt="Movie"
				className="rounded-xl object-cover w-32 h-32 "
			/>
		</Link>
		<div className="card-body">
			<div className="flex justify-between h-full">
				<h2 className="card-title">{ props.product.name }</h2>
			</div>
			<div className="flex justify-between items-end">
				<div className="">
					<p>{ toRupiah(props.product.price) }</p>
					<p>{ props.product.type }</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={ props.onClick }
						className=' btn btn-square btn-error btn-sm '>
						<Trash/>
					</button>
					<Link
						href={ `/admin/product/update/${ props.product.id }` }
						className=" btn btn-square btn-info btn-sm ">
						<Pen/>
					</Link>
				</div>
			</div>
		</div>
	</div>;
}
