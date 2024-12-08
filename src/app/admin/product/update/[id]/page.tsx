import React from 'react'
import ProductForm from "@/app/admin/product/ProductForm.client";
import {getId} from "@/lib/requestHelper";
import type {TContext} from "@/interface/server/param";
import {productId} from "@/network/product";


export default async function Page(context: TContext) {

	const id = await getId(context)
	const {data} = await productId(id)

	return (
		<div>
			<ProductForm
				defaultValues={data}
				method={'PUT'}
				id={id}
			/>
		</div>
	)
}
