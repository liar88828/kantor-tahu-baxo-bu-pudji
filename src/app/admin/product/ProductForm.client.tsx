"use client"
import React from 'react';
import {TProductCreate} from "@/entity/product.model";
import {TReactFormHookComponent} from "@/interface/server/param";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {productCreate, productUpdate} from "@/network/product";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductCreate} from "@/validation/product.valid";


export default function ProductForm({defaultValues, method, id,}: TReactFormHookComponent<TProductCreate>) {
	const router = useRouter()

	const {handleSubmit, register, formState: {errors}} = useForm<TProductCreate>({
		resolver: zodResolver(ProductCreate), defaultValues
	});

	const onSubmitAction = async (data: TProductCreate) => {
		const idToast = toast.loading("Send Data to API");
		try {
			if (method === 'POST') {
				await productCreate(data)
				toast.success('Success Create Data');
			} else if (method === 'PUT') {
				await productUpdate(data, id)
				toast.success('Success Update Data');
			}
			router.push('/admin/product')
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
		<div>
			<div className="card">
				<form className='card-body' onSubmit={handleSubmit(onSubmitAction)}>
					<h2 className={'card-title mb-5'}>Form {method === 'POST' ? "Create" : 'Update'} Product</h2>
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

					{/* Price */}
					<div className="">
						<label htmlFor="price">Price</label>
						<input
							className='input input-bordered w-full'
							type="number"
							{...register("price", {
								valueAsNumber: true,
								required: "Price is required",
								min: {
									value: 0,
									message: "Price must be greater than or equal to 0"
								}
							})}
						/>
						{errors.price && <p className="text-red-500">{errors.price.message}</p>}
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

					{/* Location */}
					<div className="">
						<label htmlFor="location">Location</label>
						<textarea
							className='textarea textarea-bordered w-full'
							{...register("location", {required: "Location is required"})}
						></textarea>
						{errors.location && <p className="text-red-500">{errors.location.message}</p>}
					</div>

					{/* Quantity */}
					<div className="">
						<label htmlFor="qty">Quantity</label>
						<input
							className='input input-bordered w-full'
							type="number"
							{...register("qty", {
								valueAsNumber: true,
								required: "Quantity is required",
								min: {
									value: 0,
									message: "Quantity must be greater than or equal to 0"
								}
							})}
						/>
						{errors.qty && <p className="text-red-500">{errors.qty.message}</p>}
					</div>

					<button className='btn btn-info mt-4' type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}
