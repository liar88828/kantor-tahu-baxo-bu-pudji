'use client'
import React, { useEffect, useRef, useState } from 'react';
import { toRupiah } from '@/utils/toRupiah';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from "next/navigation";
import { TProductDB } from "@/entity/product.model";
import { useProduct } from "@/store/useProduct";
import { EmptyData } from "@/app/components/ErrorData";
import { LoadingSpin } from "@/app/components/LoadingData";
import { useTrolley } from "@/store/useTrolley";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function Page() {
	const router = useRouter();
	const observerRef = useRef<HTMLDivElement | null>(null);
	const { getProductUser } = useProduct();
	const { push } = useTrolley(useQueryClient())

	// State for search input
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState(search);

	// Debounce the search input to avoid excessive API calls
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedSearch(search), 500); // Wait 500ms before applying the search
		return () => clearTimeout(handler);
	}, [search]);

	const {
		data,
		status,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
	} = getProductUser(search, debouncedSearch)

	const addTrolley = (data: TProductDB) => {
		const idToast = toast.loading('Loading...')
		try {
			push.mutate({ id: data.id, qty: 1 })
		} catch (error) {
			console.log(error);
		} finally {
			toast.dismiss(idToast)
		}
	}

	// Automatically trigger `fetchNextPage` when scrolling
	useEffect(() => {
		if (!hasNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchNextPage();
				}
			},
			{ rootMargin: '200px' } // Trigger slightly before the element is in view
		);

		if (observerRef.current) observer.observe(observerRef.current);

		return () => {
			if (observerRef.current) observer.unobserve(observerRef.current);
		};
	}, [hasNextPage, fetchNextPage]);


	return (
		<div className="px-4 space-y-5">
			<div className="flex items-center justify-between gap-5">
				<input
					className='input input-bordered w-full'
					placeholder='Search ...'
					value={ search }
					type="text"
					onChange={ (e) => setSearch(e.target.value) }
				/>
			</div>

			<div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid xl:grid-cols-6 gap-2'>
				{ status === 'pending' && <p><LoadingSpin/></p> }
				{ (status === 'error' || error) && <div className={ 'flex justify-center' }>
									<EmptyData page={ 'Product User' }/>
								</div> }
				{ data?.pages.map((page, pageIndex) => (
						page.data
						// .filter(product=>product.name.toLowerCase().includes(search.toLowerCase()))
						.map(d => (<div
									key={ d.id } className=" bordered  rounded-xl bg-base-300 ">
									<figure
										className='p-1'
										onClick={ () => router.push(`/product/${ d.id }`) }
									>
										{/* eslint-disable-next-line @next/next/no-img-element */ }
										<img className='rounded-xl object-cover w-full h-44 '
											 src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
											 alt="Shoes"
										/>
									</figure>
									<div className="p-5">
										<h2 className="card-title">{ d.name }</h2>
										<div className="flex justify-between items-end">
											<div className="">
												<p>{ toRupiah(d.price) }</p>
												<p>Pedas</p>
											</div>
											<button
												onClick={ () => addTrolley(d) }
												className="btn btn-primary btn-sm btn-square ">
												<ShoppingCart className=''/>
											</button>
										</div>
									</div>
								</div>
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
			{/*<div className="mt-4">*/ }
			{/*	{ hasNextPage && (*/ }
			{/*		<button*/ }
			{/*			onClick={ () => fetchNextPage() }*/ }
			{/*			disabled={ !hasNextPage || isFetchingNextPage }*/ }
			{/*			className="px-4 py-2 bg-blue-500 text-white rounded"*/ }
			{/*		>*/ }
			{/*			{ isFetchingNextPage*/ }
			{/*				? 'Loading more...'*/ }
			{/*				: hasNextPage*/ }
			{/*					? 'Load More'*/ }
			{/*					: 'Nothing more to load' }*/ }
			{/*		</button>*/ }
			{/*	) }*/ }
			{/*</div>*/ }
			{/*<div>{ isFetching && !isFetchingNextPage ? 'Fetching...' : null }</div>*/ }

		</div>
	)
}

