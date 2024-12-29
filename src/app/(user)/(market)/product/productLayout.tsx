'use client'
import React, { useRef } from "react";
import { PRODUCT_FILTER_PRICE, useProductStore } from "@/store/product";
import { ChevronDown, ChevronsUpDown, ChevronUp, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { PRODUCT, useProduct } from "@/hook/useProduct";
import { useTrolley } from "@/hook/useTrolley";
import { useDebounce } from "@/hook/useDebounce";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { PageEmptyData } from "@/app/components/PageErrorData";
import { TProductDB } from "@/interface/entity/product.model";
import { toRupiah } from "@/utils/toRupiah";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse } from "@/interface/server/param";
import { categoryData } from "@/assets/MenuList";

export function ProductLayout({ children }: { children: React.ReactNode }) {

    const { filter, setFilter } = useProductStore();
    const { name, ...rest } = filter
    const { getProductType } = useProduct();
    const { data: productType } = getProductType()
    const queryClient = useQueryClient();
    const debouncedSearch = useDebounce(filter.name, 1000)
    const data = queryClient.getQueryData<InfiniteData<PaginatedResponse, unknown> | undefined>([ PRODUCT.KEY, debouncedSearch, ...Object.values(rest) ],)

    // console.log(data)
    return (
        <div className="px-3 space-y-5">
            <div className="">
                <div className="flex items-center justify-between ">
                    <input
                        className='input input-bordered w-full'
                        placeholder='Search ...'

                        value={ filter.name }
                        type="text"
                        onChange={ (e) => setFilter({ name: e.target.value }) }
                        list={ 'products' }
                    />
                    <datalist id={ 'products' }>{
                        data?.pages
                        .map(item => item.data
                        .slice(0, 10)
                        .map(_item => (
                            <option key={ _item.id }>{ _item.name }</option>
                        )))
                    }
                    </datalist>
                </div>
                <div className="flex gap-5 mt-2 justify-between sm:justify-normal">

                    <button
                        onClick={ () => setFilter({ related: true }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm  ${ filter.related && "btn-active" }` }>
                        Related
                    </button>

                    <button
                        onClick={ () => setFilter({ popular: true }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm  ${ filter.popular && "btn-active" }` }>
                        Popular
                    </button>

                    <button
                        onClick={ () => setFilter({ new: true }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm  ${ filter.new && "btn-active" }` }>
                        New
                    </button>

                    <button
                        onClick={ () => setFilter({ price: filter.price }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm ${ filter.price === PRODUCT_FILTER_PRICE.NORMAL ? '' : 'btn-active' } ` }>
                        Price {
                        filter.price === PRODUCT_FILTER_PRICE.NORMAL
                            ? <ChevronsUpDown className="w-5 h-5"/>
                            : filter.price === PRODUCT_FILTER_PRICE.LOW
                                ? <ChevronDown className="w-5 h-5"/>
                                : <ChevronUp className="w-5 h-5"/>
                    }
                    </button>
                    <select
                        onChange={ (e) => setFilter({ type: e.target.value }) }
                        className="select select-bordered select-xs sm:select-sm w-20 sm:w-fit"
                        defaultValue={ filter.type }
                    >
                        <option value={ '' }>Select Type</option>
                        { productType && [ ...categoryData, ...productType ].map((item) =>
                            (<option key={ item.title }>{ item.title }</option>)
                        ) }
                    </select>
                </div>
            </div>
            { children }
        </div>
    )
}

export function ProductFetch() {
    const observerRef = useRef<HTMLDivElement | null>(null);
    // const queryClient = useQueryClient();
    const router = useRouter();
    const { useProductInfiniteQuery } = useProduct();
    const { push } = useTrolley()
    const { filter } = useProductStore();
    const debouncedSearch = useDebounce(filter.name, 1000)

    const {
        isError, isLoading,
        data,
        status,
        error,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useProductInfiniteQuery(debouncedSearch, filter, observerRef)
    // const { name, ...rest } = filter
    // queryClient.setQueryData<typeof data>([ PRODUCT.KEY, debouncedSearch, ...Object.values(rest) ], (data) => {
    //     // console.log(data);
    //     if (data) {
    //         return {
    //             pageParams: data.pageParams.slice(0, 1),
    //             pages: data.pages.slice(0, 1),
    //         }
    //     }
    // })

    if (isLoading && isFetching || status === 'pending' || !data) return <PageLoadingSpin/>
    if (isError || status === 'error' || error) {
        return (
            <div className={ 'flex justify-center' }>
                <PageEmptyData page={ 'Product User' }/>
            </div>
        )
    }

    return <>
        <div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid xl:grid-cols-6 gap-2'>
            {
                data.pages.map((page) => (
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


