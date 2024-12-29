import React from 'react'
import { ProductClient, ProductHomeCategory } from "@/app/(user)/(market)/home/product.client";
import { productNew } from "@/network/product";
import { PRODUCT_FILTER_PRICE } from "@/store/product";

export default async function Page() {
    const newProduct = await productNew({
        pagination: { limit: 20 },
        filter: { new: true }
    })
    .then(res => res.data.data)

    const lowPriceProduct = await productNew({
        pagination: { limit: 20 },
        filter: { price: PRODUCT_FILTER_PRICE.LOW }
    })
    .then(res => res.data.data)

    const popularProduct = await productNew({
        pagination: { limit: 20 },
        filter: { popular: true }
    })
    .then(res => res.data.data)

	return (
		<div className={ 'space-y-2' }>
            <ProductHomeCategory/>
            <ProductClient products={ newProduct } title={ 'New Product' }/>
            <ProductClient products={ popularProduct } title={ 'Popular Product' }/>
            <ProductClient products={ lowPriceProduct } title={ 'Economical' }/>
		</div>
	)
}

