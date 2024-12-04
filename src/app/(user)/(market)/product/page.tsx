'use client'
import React from 'react'
import {Rupiah} from '@/utils/rupiah';
import {ShoppingCart} from 'lucide-react';
import {useRouter} from "next/navigation";
import {exampleDataProduct} from "@/assets/ExampleProduct";
import {TProductDB} from "@/entity/product.model";

export default function Page() {
	const router = useRouter();

	const addTrolley = (data: TProductDB) => {
		// dispatch(pushTrolley({
		// 	id_product:data.id,
		// 	id_user:"asdasda",
		// }))
	}

	return (
		<div className="px-4 space-y-5">
			<div className="flex items-center justify-between gap-5">
				<input type="text" className='input input-bordered w-full' placeholder='Search ...'/>
				{/*<Sidebar />*/}
			</div>
			<div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid xl:grid-cols-6 gap-2'>
				{exampleDataProduct.map(d => (<div
						key={d.id}
						className=" bordered  rounded-xl bg-base-300 ">
						<figure
							className='p-1'
							onClick={() => router.push(`/product/${d}`)}

						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img className='rounded-xl object-cover w-full h-44 '
								 src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
								 alt="Shoes"
							/>
						</figure>
						<div className="p-5">
							<h2 className="card-title">{d.name}</h2>
							<div className="flex justify-between items-end">
								<div className="">
									<p>{Rupiah(d.price)}</p>
									<p>Pedas</p>
								</div>
								<button
									onClick={() => addTrolley(d)}
									className="btn btn-primary btn-sm btn-square ">
									<ShoppingCart className=''/>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
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
