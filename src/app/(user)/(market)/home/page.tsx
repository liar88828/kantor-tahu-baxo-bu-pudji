import React from 'react'
import { prisma } from "@/config/prisma";
import ProductClient from "@/app/(user)/(market)/home/product.client";
import { BaggageClaim } from "lucide-react";
import { repeat } from "@/utils/repeat";

export default async function Page() {

	const newProduct = await prisma.products.findMany({
		take: 20,
		where: {
			updated_at: {
				// gte: new Date(),
				// lte: new Date(),
			},
		}
	})
	return (
		<div className={ 'space-y-2' }>
			<div className="grid grid-cols-1">

				<div className="card card-bordered card-compact w-full">
					<div className="card-body w-full">
						<h1 className="card-title">Shop My Category</h1>
						<div className="flex gap-5 overflow-x-auto py-0.5">
							{ repeat(5).map((item) => (
								<div
									key={ item }
									className="border shadow p-7 bg-base-200/40 rounded-2xl "
								>
									<BaggageClaim/>
									<h1 className={ 'text-xl font-bold' }>
										Bag
									</h1>
								</div>
							)) }

						</div>
					</div>
				</div>
			</div>
			<ProductClient products={ newProduct } title={ 'New Product' }/>
			<ProductClient products={ newProduct } title={ 'Top Product' }/>
			<ProductClient products={ newProduct } title={ 'Old Product' }/>
		</div>
	)
}

