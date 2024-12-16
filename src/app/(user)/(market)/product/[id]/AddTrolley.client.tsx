'use client'

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { TProductDB } from "@/interface/entity/product.model";
import { useTrolley } from "@/hook/useTrolley";
import { toRupiah } from "@/utils/toRupiah";
import toast from "react-hot-toast";

export default function AddTrolleyClient({ product }: { product: TProductDB }) {
	const { push, incrementProduct, decrementProduct, message, counter } = useTrolley()

	const onPushTrolley = () => {
		const idToast = toast.loading('Loading...')
		try {
			push.mutate(product)
		} finally {
			toast.dismiss(idToast)
		}
	}

	return (
		<>
			<button className="w-full btn btn-outline flex items-center" onClick={ () => {
				// @ts-ignore
				return document.getElementById('my_modal_1').showModal();
			} }>
				<ShoppingCart/> <span className={ 'text-lg' }> Add Trolley</span>
			</button>
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add Trolley </h3>
					<div className="py-4">
						{ message && (
							<p className="text-red-500">
								{ message }
							</p>) }
					</div>
					<div className="">
						<div className="card card-compact bg-base-200 ">
							<div className="card-body ">
								<div className="flex justify-between">

									<div className="">
										<div className="card-title">
											{ product.name }
										</div>
										<p className="">
											{ toRupiah(product.price) }
										</p>

									</div>

									<div className="card-action">
										<div className="flex items-center gap-4">
											<button className={ 'btn btn-square btn-neutral' }
													onClick={ decrementProduct }>
												<Minus/>
											</button>
											<h1 className={ 'text-xl' }>{ counter }</h1>
											<button
												disabled={ product.qty === counter }
												className={ 'btn btn-square btn-neutral' }
												onClick={ incrementProduct }>
												<Plus/>
											</button>
										</div>
										{product.qty === counter&&<p className={'text-error'}>Product is Max to Add</p>}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="modal-action justify-between">
						<h1 className="text-xl">
							Total { toRupiah(product.price * counter) }
						</h1>
						<div className=" flex flex-row gap-2">
							<button
								onClick={ onPushTrolley }
								className="btn btn-info">Add Trolley
							</button>
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */ }
								<button className="btn btn-error">Close</button>
							</form>
						</div>
					</div>
				</div>
			</dialog>
		</>

	)
}

// <button
// 	onClick={ onPushTrolley }
// 	className="w-full btn btn-outline">
// 	<ShoppingCart className="mr-2 h-4 w-4"/> Add to Cart
// </button>
{/* Open the modal using document.getElementById('ID').showModal() method */
}
