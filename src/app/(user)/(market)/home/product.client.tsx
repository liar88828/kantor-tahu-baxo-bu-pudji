'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import { useTrolley } from "@/hook/useTrolley";
import { TProductDB } from "@/interface/entity/product.model";
import { ChevronRight, PackagePlus } from "lucide-react";
import { ProductCard } from "@/app/(user)/(market)/product/productLayout";
import { PRODUCT_FILTER_PRICE, useProductStore } from "@/store/product";
import { categoryData, menuData } from "@/assets/MenuList";
import { useProduct } from "@/hook/useProduct";

export function ProductClient({ products, title }: {
    title: 'New Product' | 'Economical' | 'Popular Product',
    products: TProductDB[]
}) {
    const { setFilter } = useProductStore();
	const router = useRouter();
	const { push } = useTrolley()

    return (
		<div className="card card-compact ">
			<div className="card-body">
                <div className="flex justify-between text-base-content/60">
					<h2 className="card-title">{ title }</h2>
                    <button
                        onClick={ () => {
                            if (title === 'Popular Product') {
                                setFilter({ popular: true })
                            } else if (title === 'Economical') {
                                setFilter({ price: PRODUCT_FILTER_PRICE.LOW })
                            } else if (title === 'New Product') {
                                setFilter({ new: true })
                            }
                            router.push(`/product`)
                        } }
						className={ 'flex flex-nowrap items-center hover:text-info' }
                    >
						<h1 className={ 'text-lg' }>More</h1>
						<ChevronRight/>
                    </button>
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

export function ProductHomeCategory() {
    const route = useRouter()
    const { setFilter } = useProductStore();
    const { getProductType } = useProduct();
    const { data: productType } = getProductType()
    return (
        <div className="grid sm:grid-cols-6 grid-cols-1 gap-5">
            <div className="col-span-4 card sm:card-bordered card-compact ">
                <div className="card-body ">
                    <h1 className="card-title">Shop My Category</h1>
                    <div className="flex justify-between gap-5 overflow-x-auto py-0.5">
                        { categoryData.map((item) => (
                            <button
                                onClick={ () => {
                                    setFilter({ type: item.title })
                                    route.push('/product')
                                } }
                                key={ item.title }
                                className="border shadow p-5 bg-base-200/40 rounded-2xl flex items-center flex-col gap-2 "
                            >
                                <div className="">
                                    { item.icon }
                                </div>

                                <h1 className={ '~text-base/xl font-bold' }>
                                    { item.title }
                                </h1>
                            </button>
                        )) }

                        { productType?.slice(0, 2).map((item) => (
                            <button
                                onClick={ () => {
                                    setFilter({ type: item.title })
                                    route.push('/product')
                                } }
                                key={ item.title }
                                className="border shadow p-5 bg-base-200/40 rounded-2xl flex items-center flex-col gap-2 "
                            >
                                <div className="">
                                    <PackagePlus/>
                                </div>

                                <h1 className={ '~text-base/xl font-bold' }>
                                    { item.title }
                                </h1>
                            </button>
                        )) }
                    </div>
                </div>
            </div>
            <div className="hidden sm:block col-span-2 card sm:card-bordered card-compact ">
                <div className="card-body ">
                    <h1 className="card-title">Menu</h1>
                    <div className="flex gap-5 overflow-x-auto py-0.5">
                        { menuData.map((item) => (
                            <button
                                onClick={ () => {
                                    route.push(item.href)
                                } }
                                key={ item.title }
                                className="border shadow p-5 bg-base-200/40 rounded-2xl flex items-center flex-col gap-2 "
                            >
                                <div className="">
                                    { item.icon }
                                </div>

                                <h1 className={ '~text-base/xl font-bold' }>
                                    { item.title }
                                </h1>
                            </button>
                        )) }

                    </div>
                </div>
            </div>
        </div>
    );
}

