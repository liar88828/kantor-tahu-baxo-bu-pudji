import React from 'react'
import ProductForm from '../ProductForm.client'
import {exampleProduct} from '@/assets/ExampleProduct'

export default function Page() {

	return (
		<div>
			<ProductForm
				defaultValues={exampleProduct}
				method={'POST'}
				id={''}
			/>
		</div>
	)
}
