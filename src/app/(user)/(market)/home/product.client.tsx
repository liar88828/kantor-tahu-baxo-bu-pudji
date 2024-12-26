'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import { useTrolley } from "@/hook/useTrolley";
import { TProductDB } from "@/interface/entity/product.model";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/app/(user)/(market)/product/productLayout";
import { PRODUCT_FILTER_PRICE, useProductStore } from "@/store/product";

function ProductClient({ products, title }: {
    title: 'New Product' | 'Economical' | 'Popular Product',
    products: TProductDB[]
}) {
    const { setFilter } = useProductStore();

	const router = useRouter();
	const { push } = useTrolley()

    return (
		<div className="card card-compact ">
			<div className="card-body">
                <div className="flex justify-between text-base-content/40">
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
                                addTrolleyAction={ () => push.mutate(product) }
                                detailProductAction={ () => {
                                    if (title === 'Popular Product') {
                                        setFilter({ popular: true })
                                    } else if (title === 'Economical') {
                                        setFilter({ price: PRODUCT_FILTER_PRICE.LOW })
                                    } else if (title === 'New Product') {
                                        setFilter({ new: true })
                                    }
                                    router.push(`/product/${ product.id }`)
                                }
                                }
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