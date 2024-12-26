'use client'
import { orderCreateClient, OrderCreateClient } from "@/validation/order.valid";
import { useProductStore } from "@/store/product";
import { useDeliveryStore } from "@/store/delivery";
import { usePaymentStore } from "@/store/payment";
import { useOrderStore } from "@/store/order";
import { useOrder } from "@/hook/useOrder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import {
    DeliveryDialog,
    DeliveryForm,
    PaymentButtonInput,
    PaymentDialog,
    ProductCard,
    ProductDialog,
    ReceiverForm
} from "@/app/components/order/order.client";

export function OrderForm({ data }: { data: OrderCreateClient }) {
	const { total: totalProduct, } = useProductStore()
	const { delivery: dataDelivery } = useDeliveryStore()
	const { payment: dataPayment, } = usePaymentStore()
	const { setTotal, total, } = useOrderStore()
	const { onUpsert } = useOrder()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<OrderCreateClient>({
		defaultValues: data,
		resolver: zodResolver(orderCreateClient),
	});

	const onSubmit = (formData: OrderCreateClient) => {
		data.totalProduct=totalProduct
		data.totalAll=total
		onUpsert.mutate({ data:formData, method: 'PUT', id: data.id })
    };

	useEffect(() => {
		setTotal({ totalProduct })
	}, [ setTotal, totalProduct ])
	
	return (
		<>
			<form
				onSubmit={ handleSubmit(onSubmit) }
				className=" grid grid-cols-1 sm:grid-cols-2 gap-5 px-2 pb-20"
			>
				<div>
					<h2 className="text-xl font-bold">Order Form</h2>

					{/* Order Time */ }
					<div className="form-control">
						<label className="label">
							<span className="label-text">Order Time</span>
						</label>
						<input
							type="datetime-local"
							{ ...register("orderTime",
								{
									valueAsDate: true,
								}) }
							className="input input-bordered"
						/>
					</div>
					{ errors.orderTime && <span className="text-error">{ errors.orderTime.message }</span> }

					{/* Send Time */ }
					<div className="form-control">
						<label className="label">
							<span className="label-text">Send Time</span>
						</label>
						<input
							type="datetime-local"
							{ ...register("sendTime", {
								valueAsDate: true,
							}) }
							className="input input-bordered"
						/>
					</div>
					{ errors.sendTime && <span className="text-error">{ errors.sendTime.message }</span> }

					{/* Address */ }
					<div className="form-control">
						<label className="label">
							<span className="label-text">Address</span>
						</label>
						<textarea
							{ ...register("addressCs", { required: "Address is required" }) }
							className="textarea textarea-bordered"
						></textarea>
						{ errors.addressCs && <span className="text-error">{ errors.addressCs.message }</span> }
					</div>

					{/* Description */ }
					<div className="form-control">
						<label className="label">
							<span className="label-text">Description</span>
						</label>
						<textarea
							{ ...register("desc") }
							className="textarea textarea-bordered"
						></textarea>
					</div>
					{ errors.desc && <span className="text-error">{ errors.desc.message }</span> }


					{/* Delivery */ }
					<div className="form-control">
						<label className="label">
							<span className="label-text">Delivery Name</span>
						</label>
						<div className="join w-full">
							<input
								value={ dataDelivery?.name ?? '' }
								type="text"
								{ ...register("nameDelivery") }
								className="input input-bordered join-item w-full"
							/>
							<DeliveryForm/>
						</div>
					</div>
					{ errors.nameDelivery && <span className="text-error">{ errors.nameDelivery.message }</span> }

					<div className="form-control">
						<label className="label">
							<span className="label-text">Delivery Phone</span>
						</label>
						<input
							type="text"
							value={ dataDelivery?.phone ?? '' }
							{ ...register("phoneDelivery") }
							className="input input-bordered"
						/>
					</div>
					{ errors.phoneDelivery && <span className="text-error">{ errors.phoneDelivery.message }</span> }

					<div className="form-control">
						<label className="label">
							<span className="label-text">Delivery Price</span>
						</label>
						<input
							type="number"
							{ ...register("priceDelivery",
								{
									valueAsNumber: true,
									onChange: (d) => {
										setTotal({
											totalProduct: totalProduct,
											priceDelivery: Number(d.target.value),
										})
									}
								}) }
							className="input input-bordered"
						/>
					</div>
					{ errors.priceDelivery && <span className="text-error">{ errors.priceDelivery.message }</span> }


					{/* Payment */ }
					<div className="form-control">
						<label className="label">
							<span className="label-text">Payment Name</span>
						</label>
						<div className="join w-full">
							<input
								value={ dataPayment?.name ?? '' }
								type="text"
								{ ...register("namePayment") }
								className="input input-bordered join-item w-full"
							/>
							<PaymentButtonInput/>
						</div>
					</div>
					{ errors.namePayment && <span className="text-error">{ errors.namePayment.message }</span> }


					{/* Payment */ }
					<div className="form-control">
						<label className="label">
							<span className="label-text">Total Payment</span>
						</label>
						<input
							type="number"
							{ ...register("totalPayment",
								{
									valueAsNumber: true,
									onChange: (d) => {
										setTotal({
											totalProduct: totalProduct,
											pricePayment: Number(d.target.value)
										})
									}
								}) }
							className="input input-bordered"
						/>
					</div>
					{ errors.totalPayment && <span className="text-error">{ errors.totalPayment.message }</span> }

					{/* Product */ }
					<div className="form-control">
						<label className="label">
							<span className="label-text">Total Product</span>
						</label>
						<input
							// disabled={ true }
							type="number"
							value={ totalProduct }
							{ ...register("totalProduct",
								{
									valueAsNumber: true,
								}) }
							className="input input-bordered"
						/>
					</div>
					{ errors.totalProduct && <span className="text-error">{ errors.totalProduct.message }</span> }


					<div className="form-control">
						<label className="label">
							<span className="label-text">Total All</span>
						</label>
						<input
							// disabled={ true }
							type="number"
							value={ total }
							{ ...register("totalAll",
								{
									valueAsNumber: true,
								}) }
							className="input input-bordered"
						/>
					</div>
					{ errors.totalAll && <span className="text-error">{ errors.totalAll.message }</span> }


					{/* Status */ }
					<div className="form-control">
						<label className="label">
							<span className="label-text">Status</span>
						</label>
						<select { ...register("status") } className="select select-bordered">
							<option value="Pending">Pending</option>
							<option value="Fail">Fail</option>
							<option value="Completed">Completed</option>
						</select>
					</div>
					{ errors.status && <span className="text-error">{ errors.status.message }</span> }

					{/* Submit Button */ }
					<div className="form-control mt-4 invisible sm:visible">
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</div>
				<div>
					<ReceiverForm/>
					<ProductCard/>
					<div className="form-control mt-4  visible sm:invisible">
						<button
							disabled={onUpsert.isPending}
							type="submit" className="btn btn-primary">Submit</button>
					</div>
				</div>

			</form>
			<DeliveryDialog/>
			<PaymentDialog/>
			<ProductDialog/>
		</>
	)
}

