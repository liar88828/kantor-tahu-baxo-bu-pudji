'use client'
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	DeliveryDialog,
	DeliveryForm,
	PaymentButtonInput,
	PaymentDialog,
	ProductAdmin,
	ReceiverForm
} from "@/app/components/order";
import { useProductStore } from "@/store/product";
import { useDeliveryStore } from "@/store/delivery";
import { usePaymentStore } from "@/store/payment";
import { useOrderStore } from "@/store/order";

type DeliveryOrder = {
	addressCs: string;
	desc: string;
	nameCs: string;
	nameDelivery: string;
	phoneDelivery: string;
	priceDelivery: string; // Assuming price is string based on example
	orderTime: Date; // ISO date string
	sendTime: Date; // ISO date string
	status: string;
	totalProduct: number;
	totalPayment: number; // Assuming payment is string based on example
	totalAll: number; // Assuming total is string based on example
};

const DeliveryOrderSchema: z.ZodType<DeliveryOrder> = z.object({
	addressCs: z.string(),
	desc: z.string(),
	nameCs: z.string(),
	nameDelivery: z.string(),
	orderTime: z.date(),
	phoneDelivery: z.string(),
	priceDelivery: z.string(),
	sendTime: z.date(),
	status: z.string(),
	totalPayment: z.number(),
	totalProduct: z.number(),
	totalAll: z.number(),
})

export default function OrderForm() {
	const { total: totalProduct } = useProductStore()
	const { delivery: dataDelivery } = useDeliveryStore()
	const { payment: dataPayment } = usePaymentStore()
	const { setTotal, total } = useOrderStore()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DeliveryOrder>({
		resolver: zodResolver(DeliveryOrderSchema),
	});

	const onSubmit = (data: DeliveryOrder) => {
		console.log(data);
	};
	useEffect(() => {
		setTotal({ totalProduct })
		console.log('test')
	}, [ totalProduct ])

	return (
		<div className={ 'container pt-12 grid grid-cols-2 gap-5' }>
			<form
				onSubmit={ handleSubmit(onSubmit) }
				className=""
			>
				<h2 className="text-xl font-bold">Order Form</h2>

				{/* Name */ }
				<div className="form-control">
					<label className="label">
						<span className="label-text">Customer Name</span>
					</label>
					<input
						type="text"
						{ ...register("nameCs", { required: "Customer name is required" }) }
						className="input input-bordered"
					/>
					{ errors.nameCs && <span className="text-error">{ errors.nameCs.message }</span> }
				</div>

				{/* Order Time */ }
				<div className="form-control">
					<label className="label">
						<span className="label-text">Order Time</span>
					</label>
					<input
						type="datetime-local"
						{ ...register("orderTime") }
						className="input input-bordered"
					/>
				</div>

				{/* Send Time */ }
				<div className="form-control">
					<label className="label">
						<span className="label-text">Send Time</span>
					</label>
					<input
						type="datetime-local"
						{ ...register("sendTime") }
						className="input input-bordered"
					/>
				</div>

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

				<div className="form-control">
					<label className="label">
						<span className="label-text">Delivery Price</span>
					</label>
					<input

						type="number"
						{ ...register("priceDelivery"

							, {
								valueAsNumber: true,
								onChange: (d) => setTotal({
									totalProduct: totalProduct,
									priceDelivery: Number(d.target.value),
								})
							}) }
						className="input input-bordered"
					/>
				</div>


				{/* Payment */ }
				<div className="form-control">
					<label className="label">
						<span className="label-text">Payment Name</span>
					</label>
					<div className="join w-full">
						<input
							value={ dataPayment?.name ?? '' }
							type="text"
							{ ...register("nameDelivery") }
							className="input input-bordered join-item w-full"
						/>
						<PaymentButtonInput/>
					</div>
				</div>


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

				{/* Product */ }
				<div className="form-control">
					<label className="label">
						<span className="label-text">Total Product</span>
					</label>
					<input
						disabled={ true }
						type="number"
						value={ totalProduct }
						{ ...register("totalProduct",
							{
								valueAsNumber: true,
							}) }
						className="input input-bordered"
					/>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Total All</span>
					</label>
					<input
						disabled={ true }
						type="number"
						value={ total }
						{ ...register("totalAll",
							{
								valueAsNumber: true,
							}) }
						className="input input-bordered"
					/>
				</div>

				{/* Status */ }
				<div className="form-control">
					<label className="label">
						<span className="label-text">Status</span>
					</label>
					<select { ...register("status") } className="select select-bordered">
						<option value="Pending">Pending</option>
						<option value="Processing">Processing</option>
						<option value="Completed">Completed</option>
					</select>
				</div>

				{/* Submit Button */ }
				<div className="form-control mt-4">
					<button type="submit" className="btn btn-primary">Submit</button>
				</div>
			</form>
			<div className="space-y-4">
				<ReceiverForm/>
				{/*<Delivery/>*/ }
				{/*<Payment/>*/ }
				<ProductAdmin/>
			</div>
			<DeliveryDialog/>
			<PaymentDialog/>
		</div>
	);
}

