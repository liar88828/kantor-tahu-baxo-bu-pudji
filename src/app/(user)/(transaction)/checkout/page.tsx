'use client'
import React from 'react';
import { Minus, Pen, Plus, Search, Trash } from "lucide-react";
import { toRupiah } from "@/utils/toRupiah";
import { EmptyData } from "@/app/components/ErrorData";
import useTrolleyStore from "@/store/trolley";
import { useOrderStore } from "@/store/order";
import { toAccounting } from "@/utils/accounting";
import Link from "next/link";

function Page() {
	const {
		onReceiver,
		setReceiver,
		setPayment,
		setDelivery,
		onDelivery: delivery,
		onPayment: payment,
		setData,
		onData
	} = useOrderStore()
	const { onIncrement, onDecrement, onRemove, onSelected } = useTrolleyStore();

	return (
		<div className={ 'container px-2 space-y-5' }>
			<div className="">
				<div className="px-2 mb-2">
					<div className="flex justify-between">
						<h1 className="card-title">User Receiver</h1>
						<button
							onClick={ () => {
							} }
							className={ 'btn btn-square btn-neutral ' }>
							<Search/>
						</button>
						<button className="btn" onClick={ () => {
							// @ts-ignore
							document.getElementById('my_modal_search').showModal()
						} }>
							open modal
						</button>
						<dialog id="my_modal_search" className="modal">
							<div className="modal-box">
								<h3 className="font-bold text-lg">Hello!</h3>
								<p className="py-4">Press ESC key or click the button below to close</p>
								<div className="modal-action">
									<form method="dialog">
										{/* if there is a button in form, it will close the modal */ }
										<button className="btn">Close</button>
									</form>
								</div>
							</div>
						</dialog>
					</div>
				</div>
				<div className="card card-compact bg-base-200">
					<div className="card-body">
						{ !onReceiver
							? <div className="text-lg font-bold flex justify-between">
								<h1>Please Add Receiver</h1>
							</div>
							: (
								<div className="">
									<h2 className={ 'text-xl font-bold' }>{ onReceiver.name }</h2>
									<p className={ 'text-gray-400' }>{ onReceiver.phone }</p>
									<p className={ 'text-gray-400' }>{ onReceiver.address }</p>
								</div>
							) }
					</div>
				</div>
			</div>
			<div className="">
				<div className="px-2 mb-2">
					<div className="flex justify-between">
						<h1 className="card-title">Product</h1>
					</div>
				</div>
				<div className="card card-compact bg-base-200 mt-2">
					<div className="card-body">
						<div className="space-y-2">
							{ !onSelected
								? <EmptyData page={ 'checkout' }/>
								: onSelected.map(trolley => (
									<div
										key={ trolley.id }
										className={ `card card-side card-compact bg-base-300 card-bordered` }>
										<figure>
											{/* eslint-disable-next-line @next/next/no-img-element */ }
											<img
												src="https://picsum.photos/200/300?random=1"
												alt="Movie"
												className='rounded-xl object-cover w-32 h-32 '
											/>
										</figure>
										<div className="card-body">
											<div className="flex justify-between">
												<h2 className='card-title'>Lorem, ipsum dolor.</h2>
												<button
													onClick={ () => onRemove(trolley.id) }
													className=' btn btn-square btn-error btn-sm '>
													<Trash/>
												</button>
											</div>
											<div className="flex justify-between items-end">
												<div className="">
													<p>{ toRupiah(trolley.Product.price) }</p>
													<p>{ trolley.Product.type }</p>
												</div>
												<div className="flex items-center gap-2">
													<button
														onClick={
															() => onIncrement(trolley.id) }
														className="btn btn-square btn-sm">
														<Plus/>
													</button>
													<h2>{ trolley.qty }</h2>
													<button
														onClick={ () => onDecrement(trolley.id) }
														className="btn btn-square  btn-sm">
														<Minus/>
													</button>
												</div>
											</div>
										</div>
									</div>
								)) }
						</div>
					</div>
				</div>
			</div>
			<div className="">
				<div className="px-2 mb-2">
					<div className="flex justify-between">
						<h1 className="card-title">Delivery</h1>
						<button className={ 'btn btn-neutral btn-square' }><Plus/></button>

						<button className="btn" onClick={ () => {
							// @ts-ignore
							document.getElementById('my_modal_delivery').showModal()
						} }>
							open modal
						</button>
						<dialog id="my_modal_delivery" className="modal">
							<div className="modal-box">
								<h3 className="font-bold text-lg">Hello!</h3>
								<p className="py-4">Press ESC key or click the button below to close</p>
								<div className="modal-action">
									<form method="dialog">
										{/* if there is a button in form, it will close the modal */ }
										<button className="btn">Close</button>
									</form>
								</div>
							</div>
						</dialog>
					</div>
				</div>
				<div className="card card-compact bg-base-200 mt-2">
					<div className="card-body">
						<div className="space-y-2">
							{ !delivery
								? <div className="text-lg font-bold flex justify-between">
									<h1>Please Add Delivery</h1>
								</div>
								: <div
									key={ delivery.id }
									className="card card-side card-compact bg-base-300 ">
									<figure className={ 'p-1' }>
										{/* eslint-disable-next-line @next/next/no-img-element */ }
										<img
											src="https://picsum.photos/200/300?random=1"
											alt="Movie"
											className='rounded-xl object-cover w-32 h-32 '
										/>
									</figure>
									<div className="card-body">
										<div className="flex justify-between h-full">
											<h2 className='card-title'>{ delivery.name }</h2>
										</div>
										<div className="flex justify-between items-end">
											<div className="">
												<p>{ toRupiah(delivery.price) }</p>
												<p>{ delivery.address }</p>
											</div>
											<div className="flex items-center gap-2">
												<button
													onClick={ () => {
													} }
													className=' btn btn-square btn-error btn-sm '>
													<Trash/>
												</button>
												<Link href={ `/admin/delivery/update/${ delivery.id }` }
													  className=' btn btn-square btn-info btn-sm '>
													<Pen/>
												</Link>
											</div>
										</div>
									</div>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
			<div className="">
				<div className="px-2 mb-2">
					<div className="flex justify-between">
						<h1 className="card-title">Payment

						</h1>
						<button className="btn" onClick={ () => {
							// @ts-ignore
							document.getElementById('my_modal_payment').showModal()
						} }>
							open modal
						</button>
						<dialog id="my_modal_payment" className="modal">
							<div className="modal-box">
								<h3 className="font-bold text-lg">Hello!</h3>
								<p className="py-4">Press ESC key or click the button below to close</p>
								<div className="modal-action">
									<form method="dialog">
										{/* if there is a button in form, it will close the modal */ }
										<button className="btn">Close</button>
									</form>
								</div>
							</div>
						</dialog>
						<button className={ 'btn btn-neutral btn-square' }><Plus/></button>

					</div>
				</div>
				<div className="card card-compact bg-base-200 mt-2">
					<div className="card-body">
						<div className="space-y-2">
							{ !payment
								? <div className="text-lg font-bold flex justify-between">
									<h1>Please Add Payment</h1>
								</div>
								: <div
									key={ payment.id }
									className="card card-side card-compact bg-base-300 ">
									<figure className={ 'p-1' }>
										{/* eslint-disable-next-line @next/next/no-img-element */ }
										<img
											src="https://picsum.photos/200/300?random=1"
											alt="Movie"
											className='rounded-xl object-cover w-32 h-32 '
										/>
									</figure>
									<div className="card-body">
										<div className="flex justify-between h-full">
											<h2 className='card-title'>{ payment.name }</h2>
										</div>
										<div className="flex justify-between items-end">
											<div className="">
												<p>{ toAccounting(payment.accounting) }</p>
												<p>{ payment.phone }</p>
											</div>
											<div className="flex items-center gap-2">
												<button
													onClick={ () => {
													} }
													className=' btn btn-square btn-error btn-sm '>
													<Trash/>
												</button>
												<Link
													href={ `/admin/payment/update/${ payment.id }` }
													className=' btn btn-square btn-info btn-sm '>
													<Pen/>
												</Link>
											</div>
										</div>
									</div>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;