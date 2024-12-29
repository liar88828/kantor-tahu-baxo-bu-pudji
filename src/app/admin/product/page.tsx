import React from 'react'
import ProductList from "@/app/admin/product/ProductList.client";
import { productAll } from "@/network/product";
export const dynamic = 'force-dynamic';

export default async function page() {
	const {data: products} = await productAll({pagination:{}})
	return (
		<ProductList products={products.data}/>
	)
}
