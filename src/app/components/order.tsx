import { useDeliveryStore } from "@/store/delivery";
import { Check, Minus, Plus, Search, Trash, XIcon } from "lucide-react";
import { LoadingSpin } from "@/app/components/LoadingData";
import { toRupiah } from "@/utils/toRupiah";
import { usePaymentStore } from "@/store/payment";
import { toAccounting } from "@/utils/accounting";
import { useProductStore } from "@/store/product";
import { EmptyData } from "@/app/components/ErrorData";
import React, { useState } from "react";
import { useOrderStore } from "@/store/order";
import { TReceiverDB } from "@/interface/entity/receiver.model";
import { receiverAll } from "@/network/receiver";
import Link from "next/link";
import useTrolleyStore from "@/store/trolley";
import { useReceiverStore } from "@/store/receiver";

export function Delivery() {
	const { setDelivery, delivery, getDeliveryData } = useDeliveryStore()
	return (
		<div className="">
			<div className=" mb-2">
				<h1 className="card-title">Delivery</h1>
			</div>
			<div className=" mt-2">
				<div className="">
					<div className="space-y-2">
						{ !delivery
							? <>
								<button
									className="btn btn-neutral w-full"
									onClick={ async () => {
										await getDeliveryData()
										// @ts-ignore
										document.getElementById('my_modal_delivery').showModal()
									} }>
									Please Add Delivery <Plus/>
								</button>
								<DeliveryDialog/>
							</>
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
											<p>{ delivery.phone }</p>
											<p>{ delivery.address }</p>
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={ () => setDelivery(null) }
												className={ 'btn btn-square btn-neutral' }>
												<XIcon/>
											</button>
										</div>
									</div>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		</div>

	)
}

export function DeliveryForm() {
	const { getDeliveryData, } = useDeliveryStore()
	return (
		<button
			type="button"
			className="btn join-item "
			onClick={ async () => {
				await getDeliveryData()
				// @ts-ignore
				document.getElementById('my_modal_delivery').showModal()
			} }
		>
			<Search/>
		</button>
	)
}

export function DeliveryDialog() {
	const { setDelivery, deliveryData, setSearch, search, isLoading } = useDeliveryStore()

	return (
		<dialog id="my_modal_delivery" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Please Add</h3>
				{ isLoading ? <LoadingSpin/> : (
					<div className="">
						{/*<p className="py-4">Press ESC key or click the button below to close</p>*/ }
						<div className="flex justify-between py-4">
							<input
								className={ 'input input-bordered w-full' }
								type="text"
								onChange={ (e) => setSearch(e.target.value) }
								value={ search }
								placeholder="Search..."
							/>
						</div>
						<div className=" space-y-2">
						{ deliveryData &&
							deliveryData
							.filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
							.map(delivery => {
									return <div
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
													<form method="dialog">
														<button
															onClick={ () => setDelivery(delivery) }
															className={ 'btn btn-square btn-neutral' }>
															<Check/>
														</button>
													</form>
												</div>
											</div>
										</div>
									</div>
								}
							) }
						</div>
					</div>
				)
				}

				<div className="modal-action">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */ }
						<button className="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>
	);
}

export function Payment() {
	const { getPaymentData, setPayment, payment } = usePaymentStore()

	return <div className="">
		<div className="mb-2">

			<h1 className="card-title">
				Payment
			</h1>


		</div>
		<div className=" mt-2">
			<div className="">
				<div className="space-y-2">
					{ !payment
						? <>
							<button className="btn btn-neutral w-full"
									onClick={ async () => {
										await getPaymentData()
										// @ts-ignore
										document.getElementById('my_modal_payment').showModal()
									} }>
								Please Add Payment <Plus/>
							</button>
							<PaymentDialog/>
						</>
						: <div
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
											className="btn btn-square "
											onClick={ () => setPayment(null) }>
											<XIcon/>
										</button>
									</div>
								</div>
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	</div>

}

export function PaymentButtonInput() {
	const { getPaymentData } = usePaymentStore()

	return <button className="btn join-item"
				   type={ 'button' }
				   onClick={ async () => {
					   await getPaymentData()
					   // @ts-ignore
					   document.getElementById('my_modal_payment').showModal()
				   } }>
		<Search/>
	</button>

}

export function PaymentDialog() {
	const { setSearch, setPayment, paymentData, search, } = usePaymentStore()

	return <dialog id="my_modal_payment" className="modal">
		<div className="modal-box">
			<h3 className="font-bold text-lg">Hello!</h3>
			{/*<p className="py-4">Press ESC key or click the button below to close</p>*/ }
			<input
				className={ 'input input-bordered w-full' }
				type="text"
				onChange={ (e) => {
					setSearch(e.target.value)
				} }
				value={ search }
				placeholder="Search..."
			/>
			<div className="space-y-2 mt-2">
				{
					paymentData &&
					paymentData
					.filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
					.map(payment => (
						<div
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
										<form method="dialog">
											{/* if there is a button in form, it will close the modal */ }
											<button
												className="btn btn-square "
												onClick={ () => {
													setPayment(payment);
												} }
											>
												<Check/>
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>

					)) }
			</div>
			<div className="modal-action">
				<form method="dialog">
					{/* if there is a button in form, it will close the modal */ }
					<button className="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>
}

export function Receiver() {
	const { onReceiver, setReceiver } = useOrderStore()
	const [ receiverData, setReceiverData ] = useState<TReceiverDB[]>([])
	const [ search, setSearch ] = useState<string>('')

	const loadReceiver = async () => {
		if (receiverData.length === 0) {
			const { data } = await receiverAll()
			if (data.data.length > 0) {
				setReceiverData(data.data)
			}
		}
	}

	return (
		<div className="">
			<div className="px-2 mb-2">
				<div className="flex justify-between">
					<h1 className="card-title">User Receiver</h1>

					<button
						className='btn btn-square btn-neutral'
						onClick={ async () => {
							await loadReceiver()
							// @ts-ignore
							document.getElementById('my_modal_search').showModal()
						} }>
						<Search/>
					</button>
					<dialog id="my_modal_search" className="modal">
						<div className="modal-box">
							<h3 className="font-bold text-lg">Hello!</h3>
							<div className="flex justify-between py-4">
								<input
									className={ 'input input-bordered w-full' }
									type="text"
									onChange={ (e) => {
										setSearch(e.target.value)
									} }
									value={ search }
									placeholder="Search..."
								/>

							</div>
							<div className="space-y-2">
								{
									receiverData &&
									receiverData
									.filter(receiver => receiver.name.toLowerCase().includes(search.toLowerCase()))
									.map((receiver) => (<>
											<div key={ receiver.id }
												 className="flex justify-between items-center"
											>
												<div className="">
													<h2 className={ 'text-xl font-bold' }>{ receiver.name }</h2>
													<p className={ 'text-gray-400' }>{ receiver.phone }</p>
													<p className={ 'text-gray-400' }>{ receiver.address }</p>
												</div>
												<button className={ 'btn btn-square' }
														onClick={ () => setReceiver(receiver) }>
													<Check/>
												</button>
											</div>
											<div className="divider"></div>
										</>

									)) }
							</div>
							<div className="modal-action">
								<Link
									className={ 'btn btn-neutral' }
									href={ '/admin/receiver/create' }>
									Create <Plus/>

								</Link>
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
							<div className="flex justify-between  items-center">
								<div className="">
									<h2 className={ 'text-xl font-bold' }>{ onReceiver.name }</h2>
									<p className={ 'text-gray-400' }>{ onReceiver.phone }</p>
									<p className={ 'text-gray-400' }>{ onReceiver.address }</p>
								</div>
								<button className={ 'btn btn-square btn-neutral' }
										onClick={ () => setReceiver(null) }>
									<XIcon/>
								</button>
							</div>
						) }
				</div>
			</div>
		</div>
	);
}

export function ReceiverForm() {
	const { data, setData } = useReceiverStore()
	return (
		<div className={ 'card card-compact bg-base-200' }>
			<div className="card-body">
				<h2 className={ 'card-title' }>Receiver</h2>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Receiver Name</span>
					</label>
					<input
						value={ data.name }
						onChange={ (e) => {
							setData({ name: e.target.value })
						} }
						type="text"
						className="input input-bordered"
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Receiver Phone</span>
					</label>
					<input
						value={ data.phone }
						onChange={ (e) => {
							setData({ phone: e.target.value })
						} }
						type="tel"
						className="input input-bordered"
					/>
				</div>


				<div className="form-control">
					<label className="label">
						<span className="label-text">Receiver Address </span>
					</label>
					<textarea
						onChange={ (e) => {
							setData({ address: e.target.value })
						} }
						className="textarea textarea-bordered"
						value={ data.address }
					>
				</textarea>
				</div>
			</div>
		</div>
	)
}

export function Product() {
	const { onIncrement, onDecrement, onRemove, onSelected } = useTrolleyStore();

	return (
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
												<h2>{ trolley.qty_at_buy }</h2>
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
	)
}

export function ProductAdmin() {
	const {
		productAsync,
		product,
		setSearch,
		search,
		isLoading,
		idProduct,
		productStore,
		getProductData,
		setProduct,
		setQty,
		onRemove,
		onIncrement,
		onDecrement,
		total,
	} = useProductStore()
	const { setTotal: setTotalOrder } = useOrderStore()

	// console.log(total)
	return (

		<div>
			<div className={ 'card-title' }>Product</div>
			<div className="  mt-2">
				<div className="space-y-2">
						{ !productStore
							? <EmptyData page={ 'checkout' }/>
							: productStore.map(product => (
								<div
									key={ product.id_product }
									className={ `card card-side card-compact card-bordered bg-base-200 ` }>
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
											<h2 className='card-title'>{ product.Product.name }</h2>
											<button
												onClick={ () => onRemove(product.id_product) }
												className=' btn btn-square btn-error btn-sm '>
												<Trash/>
											</button>
										</div>
										<div className="flex justify-between items-end">
											<div className="">
												<p>{ toRupiah(product.price_at_buy) }</p>
												<p>{ product.Product.type }</p>
											</div>
											<div className="flex items-center gap-2">
												<button
													onClick={
														() => {
															onIncrement(product.id_product)
															// setTotalOrder(total)
														} }
													className="btn btn-square btn-sm">
													<Plus/>
												</button>
												<input
													className={ 'input w-20' }
													type={ 'number' }
													max={ product.Product.qty }
													onChange={ (e) => {
														setQty(product.id_product, Number(e.target.value))
														// setTotalOrder(total)
													} }
													value={ product.qty_at_buy }
												/>
												<button
													onClick={ () => {
														onDecrement(product.id_product)
														// setTotalOrder(total)
													} }
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

			{/* Open the modal using document.getElementById('ID').showModal() method */ }
			<button className='btn btn-neutral w-full mt-2' onClick={ async () => {
				await getProductData()
				// @ts-ignore
				document.getElementById('my_modal_product').showModal()
			} }>
				Add Product <Plus/>
			</button>
			<dialog id="my_modal_product" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Please Select The Product</h3>
					<div className="space-y-2">
						{ isLoading
								? <LoadingSpin/>
							: productAsync
							.filter(product => !idProduct.includes(product.id))
								.map(product => <div
										key={ product.id }
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
												<h2 className='card-title'>{ product.name }</h2>
												<form method="dialog">
													<button
														className={ 'btn btn-square btn-sm btn-neutral' }
														onClick={ () => setProduct(product) }>
														<Plus/>
													</button>
												</form>
											</div>
											<p>{ toRupiah(product.price) }</p>
											<p>type { product.type }</p>
											<p>qty { product.qty }</p>
										</div>
									</div>
								) }

					</div>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */ }
							<button className="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>

	);
}
