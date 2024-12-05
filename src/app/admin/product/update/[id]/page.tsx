import React from 'react'
import ProductForm from "@/app/admin/product/ProductForm.client";
import {productUpdate} from "@/network/product";
import {getId} from "@/lib/requestHelper";
import {TContext} from "@/interface/server/param";
import {TProductCreate} from "@/entity/product.model";
import {exampleProduct} from "@/assets/ExampleProduct";


export default async function page(context: TContext) {
    const id = await getId(context)
    const onSubmit = async (data: TProductCreate) => {
        'use server'
        await productUpdate(data, id)
    }
    return (
        <div>
            <ProductForm
                defaultValues={exampleProduct}
                onSubmitAction={onSubmit}
            />
        </div>
    )
}
