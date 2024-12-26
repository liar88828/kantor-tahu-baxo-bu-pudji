"use client"
import React, { useState } from 'react';
import { TProductCreate, TProductDB } from "@/interface/entity/product.model";
import { TReactFormHookComponent } from "@/interface/server/param";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCreate } from "@/validation/product.valid";
import { useProduct } from "@/hook/useProduct";
import { Trash } from "lucide-react";
import { categoryData } from "@/assets/category";

export default function ProductForm({ defaultValues, method, id, }: TReactFormHookComponent<TProductCreate>) {
	const { onUpsert } = useProduct()

	const {handleSubmit, register, formState: {errors}} = useForm<TProductCreate>({
		resolver: zodResolver(ProductCreate), defaultValues
	});
    const [ category, setCategory ] = useState('')

	const onSubmitAction = async (data: TProductCreate) => {
        data.type = category;
        // console.log(data)
        await onUpsert({ method, data, id })
	}
    return (
        <div className="card card-compact">
            <form className='card-body' onSubmit={ handleSubmit(onSubmitAction) }>
                <h2 className={ 'card-title mb-5' }>Form { method === 'POST' ? "Create" : 'Update' } Product</h2>
                {/* Name */ }
                <div className="">
                    <label htmlFor="name">Name</label>
                    <input
                        className='input input-bordered w-full'
                        type="text"
                        { ...register("name", { required: "Name is required" }) }
                    />
                    { errors.name && <p className="text-red-500">{ errors.name.message }</p> }
                </div>

                {/* Type */ }

                <div className="form-control  ">
                    <label htmlFor="type">Type</label>
                    <div className="join w-full">
                        <input
                            className='input input-bordered w-full join-item'
                            type="text"
                            value={ category }
                            { ...register('type',
                                {
                                    required: "Type is required",
                                    onChange: (e => setCategory(e.target.value)),
                                    value: category,
                                }) }
                        />
                        <select
                            onChange={ e => setCategory(e.target.value) }
                            className={ `select select-bordered join-item  ${ errors.type ? 'select-error' : '' }` }

                        >
                            { categoryData?.map((category) => (
                                <option key={ category.title }
                                        value={ category.title }>
                                    { category.title }
                                </option>
                            )) }
                        </select>
                    </div>
                    { errors.type && <p className="text-error text-sm mt-1">{ errors.type.message }</p> }
                </div>


                {/* Price */ }
                <div className="">
                    <label htmlFor="price">Price</label>
                    <input
                        className='input input-bordered w-full'
                        type="number"
                        { ...register("price", {
                            valueAsNumber: true,
                            required: "Price is required",
                            min: {
                                value: 0,
                                message: "Price must be greater than or equal to 0"
                            }
                        }) }
                    />
                    { errors.price && <p className="text-red-500">{ errors.price.message }</p> }
                </div>

                {/* Image */ }
                <div className="">
                    <label htmlFor="img">Image URL</label>
                    <input
                        className='input input-bordered w-full'
                        type="url"
                        { ...register("img", {
                            required: "Image URL is required",
                            pattern: {
                                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                                message: "Invalid image URL"
                            }
                        }) }
                    />
                    { errors.img && <p className="text-red-500">{ errors.img.message }</p> }
                </div>

                {/* Description */ }
                <div className="">
                    <label htmlFor="desc">Description</label>
                    <textarea
                        className='textarea textarea-bordered w-full'
                        { ...register("desc", { required: "Description is required" }) }
                    />
                    { errors.desc && <p className="text-red-500">{ errors.desc.message }</p> }
                </div>

                {/* Location */ }
                <div className="">
                    <label htmlFor="location">Location</label>
                    <textarea
                        className='textarea textarea-bordered w-full'
                        { ...register("location", { required: "Location is required" }) }
                    ></textarea>
                    { errors.location && <p className="text-red-500">{ errors.location.message }</p> }
                </div>

                {/* Quantity */ }
                <div className="">
                    <label htmlFor="qty">Quantity</label>
                    <input
                        className='input input-bordered w-full'
                        type="number"
                        { ...register("qty", {
                            valueAsNumber: true,
                            required: "Quantity is required",
                            min: {
                                value: 0,
                                message: "Quantity must be greater than or equal to 0"
                            }
                        }) }
                    />
                    { errors.qty && <p className="text-red-500">{ errors.qty.message }</p> }
                </div>

                <button className='btn btn-info mt-4' type="submit">Submit</button>
            </form>

        </div>

    );
}

export function DeleteProduct({ id }: { id: TProductDB["id"] }) {
    const { onDelete } = useProduct()

    return (
        <button
            onClick={ () => onDelete(id) }
            className=' btn btn-square btn-error btn-sm '>
            <Trash/>
        </button>
    );
}

