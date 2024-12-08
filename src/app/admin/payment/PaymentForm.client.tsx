"use client"
import React from 'react';
import {useForm} from 'react-hook-form';
import {TPaymentCreate} from "@/entity/payment.model";
import {TReactFormHookComponent} from "@/interface/server/param";
import {zodResolver} from "@hookform/resolvers/zod";
import {PaymentCreate} from "@/validation/payment.valid";
import {paymentCreate, paymentUpdate} from "@/network/payment";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function PaymentForm({defaultValues, method, id,}: TReactFormHookComponent<TPaymentCreate>) {
	const router = useRouter()

	const {handleSubmit, register, formState: {errors}} = useForm<TPaymentCreate>({
		resolver: zodResolver(PaymentCreate), defaultValues
		});

	const onSubmitAction = async (data: TPaymentCreate) => {
		const idToast = toast.loading("Send Data to API");
		try {
			if (method === 'POST') {
				await paymentCreate(data)
				toast.success('Success Create Data');
			} else if (method === 'PUT') {
				await paymentUpdate(data, id)
				toast.success('Success Update Data');
			}
			router.push('/admin/payment')
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error(e)
				toast(e.message);
			}
			toast.error('something error');
		} finally {
			toast.dismiss(idToast);
		}
	}

	return (
		<div >
			<div className="card">

				<form className='card-body' onSubmit={handleSubmit(onSubmitAction)}>
					<h2 className={'card-title mb-5'}>Form {method === 'POST' ? "Create" : 'Update'} Payment</h2>

					{/* Name */}
					<div className="">
						<label htmlFor="name">Name</label>
						<input
							className='input input-bordered w-full'
							type="text"
							{...register("name", {required: "Name is required"})}
						/>
						{errors.name && <p className="text-red-500">{errors.name.message}</p>}
					</div>

					{/* Phone */}
					<div className="">
						<label htmlFor="phone">Phone</label>
						<input
							className='input input-bordered w-full'
							type="text"
							{...register("phone", {
								required: "Phone number is required",
								pattern: {
									value: /^[0-9]{10,15}$/,
									message: "Invalid phone number"
								}
							})}
						/>
						{errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
					</div>

					{/* Address */}
					<div className="">
						<label htmlFor="address">Address</label>
						<input
							className='input input-bordered w-full'
							type="text"
							{...register("address", {required: "Address is required"})}
						/>
						{errors.address && <p className="text-red-500">{errors.address.message}</p>}
					</div>

					{/* Type */}
					<div className="">
						<label htmlFor="type">Type</label>
						<input
							className='input input-bordered w-full'
							type="text"
							{...register("type", {required: "Type is required"})}
						/>
						{errors.type && <p className="text-red-500">{errors.type.message}</p>}
					</div>

					{/* Accounting */}
					<div className="">
						<label htmlFor="accounting">Accounting</label>
						<input
							className='input input-bordered w-full'
							type="text"
							{...register("accounting", {
								required: "Accounting is required",
								valueAsNumber: true,
							})}
						/>
						{errors.accounting && <p className="text-red-500">{errors.accounting.message}</p>}
					</div>

					{/* Image */}
					<div className="">
						<label htmlFor="img">Image URL</label>
						<input
							className='input input-bordered w-full'
							type="url"
							{...register("img", {
								required: "Image URL is required",
								pattern: {
									value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
									message: "Invalid image URL"
								}
							})}
						/>
						{errors.img && <p className="text-red-500">{errors.img.message}</p>}
					</div>

					{/* Description */}
					<div className="">
						<label htmlFor="desc">Description</label>
						<textarea
							className='textarea textarea-bordered w-full'
							{...register("desc", {required: "Description is required"})}
						/>
						{errors.desc && <p className="text-red-500">{errors.desc.message}</p>}
					</div>

					<button className='btn btn-info mt-4' type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}
