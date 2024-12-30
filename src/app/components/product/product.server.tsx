import React from "react";
import { ProductHistoryPageAdmin } from "@/app/components/product/product.page";
import { ProductDetailClientAdmin, ProductFormClientAdmin } from "@/app/components/product/product.client";
import { productHistory, productId } from "@/network/product";

export async function ProductFormUpdateServerAdmin({ idProduct }: { idProduct: string }) {
    const { data } = await productId(idProduct)
    return ( <ProductFormClientAdmin
            defaultValues={ data }
            method={ 'PUT' }
            id={ idProduct }
        />
    )
}

export async function ProductDetailServerAdmin({ idProduct }: { idProduct: string }) {
    const { data: product } = await productId(idProduct)
    return (
        <>
            <ProductDetailClientAdmin product={ product } />
        </>
    )
}

export async function ProductHistoryServerAdmin({ idProduct }: { idProduct: string }) {
    const { data: historyProduct } = await productHistory(idProduct)

    return (
        <ProductHistoryPageAdmin historyOrderProducts={ historyProduct } />
    )
}
