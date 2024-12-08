'use client'
import React from 'react'
import { Rupiah } from '@/utils/rupiah';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from "next/navigation";
import { TProductDB } from "@/entity/product.model";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFetch } from "@/hook/useFetch";
import { ResponseAll } from "@/interface/server/param";

type PaginatedResponse = {
	data: TProductDB[];
	nextCursor: number; // Cursor for next page or null if no more data
};

type PageParams = {
	pageParam?: string;
};
const fetchProjects = async ({ pageParam = '', }: PageParams): Promise<PaginatedResponse> => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { data } = await useFetch<ResponseAll<TProductDB>>('GET', `/products?page=${ pageParam }`);
	
	return {
		data: data.data,
		nextCursor: data.page
	}
}
const PRODUCT_KEY = 'product'

export default function Page() {
	const router = useRouter();
	
	const {
		data,
		status,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery<PaginatedResponse, Error>({
		queryKey: [PRODUCT_KEY],
		queryFn: async (context): Promise<PaginatedResponse> => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const { data } = await useFetch<ResponseAll<TProductDB>>('GET', `/product?page=${ context.pageParam }`);
			
			return {
				data: data.data,
				nextCursor: data.page
			}
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.nextCursor === 0) {
				return undefined;
			} else {
				return lastPage.nextCursor + 1
			}
		},
		getPreviousPageParam: (firstPage, pages) => {
			if (firstPage.nextCursor <= 1) {
				return undefined
			}
			return firstPage.nextCursor //- 1
		},
	})
	
	
	const addTrolley = (data: TProductDB) => {
		// dispatch(pushTrolley({
		// 	id_product:data.id,
		// 	id_user:"asdasda",
		// }))
	}
	
	if (status === 'pending') {
		return <p>Loading...</p>;
	} else if (status === 'error') {
		return <p>Error loading data.</p>;
	}
	
	
	return (
		<div className="px-4 space-y-5">
			<div className="flex items-center justify-between gap-5">
				<input type="text" className='input input-bordered w-full' placeholder='Search ...'/>
				{/*<Sidebar />*/ }
			</div>
			<div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid xl:grid-cols-6 gap-2'>
				{
					data?.pages.map((page, pageIndex) => (
							page.data.map(d => (<div
										key={ d.id } className=" bordered  rounded-xl bg-base-300 ">
										<figure
											className='p-1'
											onClick={ () => router.push(`/product/${ d }`) }
										
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
													<p>{ Rupiah(d.price) }</p>
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
			<div className="mt-4">
				{ hasNextPage && (
					<button
						onClick={ () => fetchNextPage() }
						disabled={ !hasNextPage || isFetchingNextPage }
						className="px-4 py-2 bg-blue-500 text-white rounded"
					>
						{ isFetchingNextPage
							? 'Loading more...'
							: hasNextPage
								? 'Load More'
								: 'Nothing more to load' }
					</button>
				) }
			</div>
			<div>{ isFetching && !isFetchingNextPage ? 'Fetching...' : null }</div>
		
		</div>
	)
}

// export function Sidebar() {
//     return (
//     <div>
//       {/* Open the modal using document.getElementById('ID').showModal() method */}
//       <button className="btn btn-square" onClick={() => {
//             // @ts-ignore
//           document.getElementById('my_modal_1').showModal()
//       }}>
//         <ListFilter />
//
//
//       </button>
//       <dialog id="my_modal_1" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Search</h3>
//           <input type="text" className='input input-bordered w-full' placeholder='Search ...' />
//
//           <div className="modal-action">
//             <form method="dialog">
//               {/* if there is a button in form, it will close the modal */}
//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   )
// }
