import { apiProduct } from '@/app/page'
import { revalidatePath, revalidateTag } from 'next/cache'
import { TProducts } from '../typeProduce'

export const addProductToDatabase = async (e: FormData) => {
	'use server'
	const product = e.get('product')?.toString()
	const price = e.get('price')?.toString()
	if (!product || !price) return

	const newProduct: TProducts = {
		product: product,
		price: price,
	}
	await fetch(apiProduct, {
		method: 'POST',
		body: JSON.stringify(newProduct),
		headers: { 'Content-Type': 'application/json' },
	})
	revalidateTag('product')
	// revalidatePath('/')
}
