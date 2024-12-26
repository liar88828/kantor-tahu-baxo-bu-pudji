import React from 'react'
import { prisma } from "@/config/prisma";
import ProductClient from "@/app/(user)/(market)/home/product.client";
import { categoryData } from "@/assets/category";

export default async function Page() {

	const newProduct = await prisma.products.findMany({
		take: 20,
        orderBy: {
            update_stock: 'desc'
        }
    })

    const popularProduct = await prisma.products.findMany({
        take: 20,
        orderBy: {
            sold: 'desc'
        }
    })
    const lowPriceProduct = await prisma.products.findMany({
        take: 20,
        orderBy: {
            price: 'asc'
        }
    })

	return (
		<div className={ 'space-y-2' }>
			<div className="grid grid-cols-1">

				<div className="card card-bordered card-compact w-full">
					<div className="card-body w-full">
						<h1 className="card-title">Shop My Category</h1>
						<div className="flex gap-5 overflow-x-auto py-0.5">
                            { categoryData.map((item) => (
								<div
                                    key={ item.title }
                                    className="border shadow p-5 bg-base-200/40 rounded-2xl flex items-center flex-col gap-2 "
								>
                                    <div className="">
                                        { item.icon }
                                    </div>

									<h1 className={ 'text-xl font-bold' }>
                                        { item.title }
                                    </h1>
								</div>
							)) }

						</div>
					</div>
				</div>
			</div>
			<ProductClient products={ newProduct } title={ 'New Product' }/>
            <ProductClient products={ popularProduct } title={ 'Popular Product' }/>
            <ProductClient products={ lowPriceProduct } title={ 'Economical' }/>
		</div>
	)
}

