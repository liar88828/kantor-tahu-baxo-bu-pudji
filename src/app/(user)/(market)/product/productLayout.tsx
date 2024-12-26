'use client'
import React, { useRef } from "react";
import { PRODUCT_FILTER_PRICE, useProductStore } from "@/store/product";
import { ChevronDown, ChevronsUpDown, ChevronUp, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/hook/useProduct";
import { useTrolley } from "@/hook/useTrolley";
import { useDebounce } from "@/hook/useDebounce";
import { LoadingSpin } from "@/app/components/LoadingData";
import { EmptyData } from "@/app/components/ErrorData";
import { TProductDB } from "@/interface/entity/product.model";
import { toRupiah } from "@/utils/toRupiah";

export function ProductLayout({ children }: { children: React.ReactNode }) {
    const { filter, setFilter } = useProductStore();

    return (
        <div className="px-4 space-y-5">
            <div className="">
                <div className="flex items-center justify-between gap-5">
                    <input
                        className='input input-bordered w-full'
                        placeholder='Search ...'
                        value={ filter.name }
                        type="text"
                        onChange={ (e) => setFilter({ name: e.target.value }) }
                    />
                </div>
                <div className="flex gap-4 mt-2">


                    <button
                        onClick={ () => setFilter({ related: true }) }
                        className={ `btn btn-outline btn-sm  ${ filter.related && "btn-active" }` }>
                        Related
                    </button>
                    <button
                        onClick={ () => setFilter({ popular: true }) }
                        className={ `btn btn-outline btn-sm  ${ filter.popular && "btn-active" }` }>
                        Popular
                    </button>

                    <button
                        onClick={ () => setFilter({ new: true }) }
                        className={ `btn btn-outline btn-sm  ${ filter.new && "btn-active" }` }>
                        New
                    </button>

                    <button
                        onClick={ () => setFilter({ price: filter.price }) }
                        className={ `btn btn-outline btn-sm ${ filter.price === PRODUCT_FILTER_PRICE.NORMAL ? '' : 'btn-active' } ` }>
                        Price {
                        filter.price === PRODUCT_FILTER_PRICE.NORMAL
                            ? <ChevronsUpDown/>
                            : filter.price === PRODUCT_FILTER_PRICE.LOW
                                ? <ChevronDown/>
                                : <ChevronUp/>
                    }
                    </button>

                </div>
            </div>
            { children }
        </div>
    )
}

export function ProductFetch() {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const { useProductInfiniteQuery } = useProduct();
    const { push } = useTrolley()
    const { filter } = useProductStore();
    const debouncedSearch = useDebounce(filter.name)

    const {
        data,
        status,
        error,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useProductInfiniteQuery(debouncedSearch, filter, observerRef)

    if (status === 'pending') return <LoadingSpin/>

    if (status === 'error' || error) {
        return (
            <div className={ 'flex justify-center' }>
                <EmptyData page={ 'Product User' }/>
            </div>
        )
    }

    return <>
        <div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid xl:grid-cols-6 gap-2'>
            {
                data?.pages.map((page) => (
                        page.data
                        // .filter(product=>product.name.toLowerCase().includes(search.toLowerCase()))
                        .map((product) => (
                                <ProductCard
                                    key={ product.id }
                                    product={ product }
                                    addTrolleyAction={ () => push.mutate(product) }
                                    detailProductAction={ () => router.push(`/product/${ product.id }`) }
                                />
                            )
                        )
                    )
                )
            }
        </div>
        {/* Observer Target for Infinite Scroll */ }
        <div ref={ observerRef } className="text-center py-4 text-gray-500">
            { isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                    ? 'Scroll down to load more'
                    : 'No more data to load' }
        </div>
        { isFetching && !isFetchingNextPage && <div>Fetching...</div> }
    </>
}

export function ProductCard({ product, detailProductAction, addTrolleyAction }: {
    product: TProductDB,
    detailProductAction: () => void,
    addTrolleyAction: () => void
}) {
    return (
        <div
            className=" bordered rounded-xl bg-base-200/20 shadow ">
            <figure
                onClick={ detailProductAction }
            >
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img className='rounded-xl object-cover w-full ~h-40/44 '
                     src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                     alt="Shoes"
                />
            </figure>
            <div className="~px-3/5 pb-3 mt-1">
                <h2 className="~text-lg/2xl font-bold">{ product.name }</h2>
                <div className="flex justify-between items-end">
                    <div className="">
                        <p>{ toRupiah(product.price) }</p>
                        <p>{ product.type }</p>
                    </div>
                    <button
                        onClick={ addTrolleyAction }
                        className="btn btn-primary btn-sm btn-square ">
                        <ShoppingCart className=''/>
                    </button>
                </div>
            </div>
        </div>
    );
}


