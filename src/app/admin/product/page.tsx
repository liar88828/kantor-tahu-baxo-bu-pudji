import React from 'react'
import ProductList from "@/app/admin/product/ProductList.client";
import { productAll } from "@/network/product";

export default async function page() {
	const {data: products} = await productAll()
	return (
		<ProductList products={products.data}/>
	)
}
