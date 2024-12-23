'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import { useTrolley } from "@/hook/useTrolley";
import { TProductDB } from "@/interface/entity/product.model";
import { ProductCard } from "@/app/(user)/(market)/product/page";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function ProductClient({ products, title }: { title: string, products: TProductDB[] }) {
	const router = useRouter();
	const { push } = useTrolley()

	const addTrolley = (data: TProductDB) => {
		push.mutate(data,)
	}

	return (
		<div className="card card-compact ">
			<div className="card-body">
				<div className="flex justify-between">
					<h2 className="card-title">{ title }</h2>
					<Link
						className={ 'flex flex-nowrap items-center hover:text-info' }
						href={ '/product' }>
						<h1 className={ 'text-lg' }>More</h1>
						<ChevronRight/>
					</Link>
				</div>
				<div className='flex gap-3 overflow-x-auto'>
					{ products.map((product: TProductDB) => (
						<div
							key={ product.id }
							className={ ' flex-shrink-0 ~w-40/48 py-0.5' }
						>
							<ProductCard
								product={ product }
								addTrolleyAction={ () => addTrolley }
								detailProductAction={ () => router.push(`/product/${ product.id }`) }
							/>
						</div>
					))
					}
				</div>
			</div>
		</div>
	);
}

export default ProductClient;