import React from 'react'
import ProductForm from '../ProductForm.client'
import {exampleProduct} from '@/assets/ExampleProduct'
import type {TProductCreate} from '@/entity/product.model'
import {productCreate} from '@/network/product'

export default function page() {
    const onSubmit = async (data: TProductCreate) => {
        'use server'
        await productCreate(data)
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
