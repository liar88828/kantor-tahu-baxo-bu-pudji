'use client'
import React, { useRef } from 'react';
import { toRupiah } from '@/utils/toRupiah';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { useRouter } from "next/navigation";
import { TProductDB } from "@/interface/entity/product.model";
import { useProduct } from "@/hook/useProduct";
import { EmptyData } from "@/app/components/ErrorData";
import { LoadingSpin } from "@/app/components/LoadingData";
import { useTrolley } from "@/hook/useTrolley";
import { useProductStore } from "@/store/product";
import { useDebounce } from "@/hook/useDebounce";

export default function Page() {

	return (
		<ProductLayout>
			<ProductFetch/>
		</ProductLayout>
	)
}

function ProductLayout({ children }: { children: React.ReactNode }) {
	const { search, setSearch } = useProductStore();

	return (
		<div className="px-4 space-y-5">
			<div className="">
				<div className="flex items-center justify-between gap-5">
					<input
						className='input input-bordered w-full'
						placeholder='Search ...'
						value={ search }
						type="text"
						onChange={ (e) => setSearch(e.target.value) }
					/>
				</div>
				<div className="flex gap-5 mt-2">

					<button className={ 'btn btn-outline btn-sm ' }>
						Price <ChevronDown/>
					</button>

					<button className={ 'btn btn-outline btn-sm ' }>
						Popular
					</button>

					<button className={ 'btn btn-outline btn-sm' }>
						New
					</button>


					{/*<button className={ 'btn btn-outline ' }>*/ }
					{/*	Popular*/ }
					{/*</button>*/ }
				</div>
			</div>
			{ children }
		</div>
	)
}

export function ProductFetch() {
	const observerRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();
	const { useProductInfiniteQuery } = useProduct();
	const { push } = useTrolley()
	const { search } = useProductStore();
	const debouncedSearch = useDebounce(search)

	const addTrolley = (data: TProductDB) => {
		push.mutate(data,)
	}

	const {
		data,
		status,
		error,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
	} = useProductInfiniteQuery(debouncedSearch, search, observerRef)

	if (status === 'pending') return <LoadingSpin/>

	if (status === 'error' || error) {
		return (
			<div className={ 'flex justify-center' }>
				<EmptyData page={ 'Product User' }/>
			</div>
		)
	}

	return <>
		<div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid xl:grid-cols-6 gap-2'>
			{
				data?.pages.map((page) => (
						page.data
						// .filter(product=>product.name.toLowerCase().includes(search.toLowerCase()))
						.map((product) => (
								<ProductCard
									key={ product.id }
									product={ product }
									addTrolleyAction={ () => addTrolley(product) }
									detailProductAction={ () => router.push(`/product/${ product.id }`) }
								/>
							)
						)
					)
				)
			}
		</div>
		{/* Observer Target for Infinite Scroll */ }
		<div ref={ observerRef } className="text-center py-4 text-gray-500">
			{ isFetchingNextPage
				? 'Loading more...'
				: hasNextPage
					? 'Scroll down to load more'
					: 'No more data to load' }
		</div>
		{ isFetching && !isFetchingNextPage && <div>Fetching...</div> }
	</>
}

export function ProductCard({ product, detailProductAction, addTrolleyAction }: {
	product: TProductDB,
	detailProductAction: () => void,
	addTrolleyAction: () => void
}) {
	return (
		<div
			className=" bordered rounded-xl bg-base-200/20 shadow ">
			<figure
				className='p-1'
				onClick={ detailProductAction }
			>
				{/* eslint-disable-next-line @next/next/no-img-element */ }
				<img className='rounded-xl object-cover w-full ~h-40/44 '
					 src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					 alt="Shoes"
				/>
			</figure>
			<div className="~px-3/5 pb-3 mt-1">
				<h2 className="~text-lg/2xl font-bold">{ product.name }</h2>
				<div className="flex justify-between items-end">
					<div className="">
						<p>{ toRupiah(product.price) }</p>
						<p>{ product.type }</p>
					</div>
					<button
						onClick={ addTrolleyAction }
						className="btn btn-primary btn-sm btn-square ">
						<ShoppingCart className=''/>
					</button>
				</div>
			</div>
		</div>
	);
}


