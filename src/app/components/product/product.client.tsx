'use client'
import Link from "next/link";
import React, { useRef, useState } from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp, Minus, Plus, ShoppingCart } from "lucide-react";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { PRODUCT, useProduct } from "@/hook/useProduct";
import { PRODUCT_FILTER_PRICE, TProductCreate, TProductDB } from "@/interface/entity/product.model";
import { PageEmptyData, PageErrorData } from "@/app/components/PageErrorData";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { PaginatedResponse, ResponseAll, TReactFormHookComponent } from "@/interface/server/param";
import {
    ProductCardPageAdmin,
    ProductCardPageUser,
    ProductDetailPageAdmin
} from "@/app/components/product/product.page";
import { ProductCreate } from "@/validation/product.valid";
import { categoryData } from "@/assets/MenuList";
import { productAll } from "@/network/product";
import { toRupiah } from "@/utils/toRupiah";
import { toUnique } from "@/utils/toUnique";
import { useDebounce } from "@/hook/useDebounce";
import { useForm } from "react-hook-form";
import { useProductStore } from "@/store/product";
import { useRouter } from "next/navigation";
import { useTrolley } from "@/hook/useTrolley";
import { zodResolver } from "@hookform/resolvers/zod";

export function ProductLayoutClientUser({ children }: { children: React.ReactNode }) {

    const { filter, setFilter } = useProductStore();
    const { name, ...rest } = filter
    const { getProductType } = useProduct();
    const { data: productType } = getProductType()
    const queryClient = useQueryClient();
    const debouncedSearch = useDebounce(filter.name, 1000)
    const data = queryClient.getQueryData<InfiniteData<PaginatedResponse, unknown> | undefined>([ PRODUCT.KEY, debouncedSearch, ...Object.values(rest) ],)

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
                        className={ `btn btn-outline btn-xs sm:btn-sm  ${ filter.related && "btn-active" }` }
                    >
                        Related
                    </button>

                    <button
                        onClick={ () => setFilter({ popular: true }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm  ${ filter.popular && "btn-active" }` }
                    >
                        Popular
                    </button>

                    <button
                        onClick={ () => setFilter({ new: true }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm  ${ filter.new && "btn-active" }` }
                    >
                        New
                    </button>

                    <button
                        onClick={ () => setFilter({ price: filter.price }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm ${ filter.price === PRODUCT_FILTER_PRICE.NORMAL ? '' : 'btn-active' } ` }
                    >
                        Price {
                        filter.price === PRODUCT_FILTER_PRICE.NORMAL
                            ? <ChevronsUpDown className="w-5 h-5" />
                            : filter.price === PRODUCT_FILTER_PRICE.LOW
                                ? <ChevronDown className="w-5 h-5" />
                                : <ChevronUp className="w-5 h-5" />
                    }
                    </button>
                    <select
                        onChange={ (e) => setFilter({ type: e.target.value }) }
                        className="select select-bordered select-xs sm:select-sm w-20 sm:w-fit"
                        defaultValue={ filter.type }
                    >
                        <option value={ '' }>Select Type</option>
                        { productType && [ ...categoryData, ...productType ].map((item) =>
                            ( <option key={ item.title }>{ item.title }</option> )
                        ) }
                    </select>
                </div>
            </div>
            { children }
        </div>
    )
}

export function ProductFetchClientUser() {
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

    if (isLoading && isFetching || status === 'pending' || !data) return <PageLoadingSpin />
    if (isError || status === 'error' || error) {
        return (
            <div className={ 'flex justify-center' }>
                <PageEmptyData page={ 'Product User' } />
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
                                <ProductCardPageUser
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

export function ProductListClientAdmin() {
    const { onDelete } = useProduct()
    const { filter } = useProductStore()
    const searchDebounce = useDebounce(filter.name, 500)

    const { data: products, isLoading, isError } = useQuery({
        enabled: searchDebounce === filter.name,
        select: (data) => data.data.data,
        queryKey: [ PRODUCT.KEY, searchDebounce ],
        queryFn: () => productAll({
            pagination: { limit: 50 },
            filter: { name: searchDebounce }
        })
    })

    if (isLoading || !products) return <PageLoadingSpin />
    if (isError) return <PageErrorData />
    if (products.length === 0) return <PageErrorData code={ 404 } msg={ 'Data Payment is Empty' } />

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mb-20 ">
            { products.map(product => (
                <ProductCardPageAdmin
                    key={ product.id }
                    onClick={ () => onDelete(product.id) }
                    product={ product }
                />
            )) }
        </div>
    )
}

export function ProductSearchClientAdmin({ children }: { children: React.ReactNode }) {
    const { filter, setFilter } = useProductStore()
    const queryClient = useQueryClient();
    const products = queryClient.getQueryData<{ data: ResponseAll<TProductDB> }>([ PRODUCT.KEY, '' ])
    return ( <>
            <div className="flex justify-between mb-4 gap-3">
                <input
                    type="text"
                    className='input input-bordered w-full'
                    onChange={ e => setFilter({ name: e.target.value }) }
                    value={ filter.name }
                    placeholder='search...'
                    list={ 'products' }
                />
                <datalist id="products">
                    { products?.data.data
                    .slice(0, 10)
                    .map((item) => (
                        <option
                            key={ item.id }
                            value={ item.name }
                        >
                            { item.name }
                        </option>
                    )) }
                </datalist>
                <Link href={ '/admin/product/create' } className='btn btn-square'>
                    <Plus />
                </Link>
            </div>
            { children }
        </>
    );
}

export function ProductDetailClientAdmin({ product }: { product: TProductDB }) {
    const { onDelete, onUpdateStock } = useProduct()
    const router = useRouter()
    const [ stock, setStock ] = useState(0)
    const updateStock = async () => {
        await onUpdateStock(product.id, stock)
    }

    return (
        <ProductDetailPageAdmin
            product={ product }
            onChangeAction={ (e: React.ChangeEvent<HTMLInputElement>) => setStock(Number(e.target.value)) }
            onAddStockAction={ updateStock }
            hrefUpdateAction={ () => router.push(`/admin/product/update/${ product.id }`) }
            onDeleteAction={ () => onDelete(product.id) }
        />

    )
}

export function ProductFormClientAdmin({ defaultValues, method, id, }: TReactFormHookComponent<TProductCreate>) {
    const { onUpsert, getProductType } = useProduct()
    const { data: productType } = getProductType()
    const { handleSubmit, register, formState: { errors } } = useForm<TProductCreate>({
        resolver: zodResolver(ProductCreate), defaultValues
    });
    const [ category, setCategory ] = useState(defaultValues?.type ?? '')

    const onSubmitAction = async (data: TProductCreate) => {
        data.type = category;
        await onUpsert({ method, data, id })
    }

    // console.log(UniqueId(productType.map(d=>d.title)??[], categoryData.map(d=>title)))

    return (
        <div className="card card-compact">
            <form className='card-body' onSubmit={ handleSubmit(onSubmitAction) }>
                <h2 className={ 'card-title mb-5' }>Form { method === 'POST' ? "Create" : 'Update' } Product</h2>
                {/* Name */ }
                <div className="">
                    <label htmlFor="name">Name</label>
                    <input
                        className='input input-bordered w-full'
                        type="text"
                        { ...register("name", { required: "Name is required" }) }
                    />
                    { errors.name && <p className="text-red-500">{ errors.name.message }</p> }
                </div>

                {/* Type */ }

                <div className="form-control  ">
                    <label htmlFor="type">Type</label>
                    <div className="join w-full">
                        <input
                            className='input input-bordered w-full join-item'
                            type="text"
                            value={ category }
                            { ...register('type',
                                {
                                    required: "Type is required",
                                    onChange: ( e => setCategory(e.target.value) ),
                                    value: category,
                                }) }
                        />
                        <select
                            onChange={ e => setCategory(e.target.value) }
                            className={ `select select-bordered join-item  ${ errors.type ? 'select-error' : '' }` }

                        >
                            { productType && toUnique(
                                productType.map(d => d.title),
                                categoryData.map(d => d.title)
                            ).map((category) => (
                                <option key={ category }
                                        value={ category }
                                >
                                    { category }
                                </option>
                            )) }
                        </select>
                    </div>
                    { errors.type && <p className="text-error text-sm mt-1">{ errors.type.message }</p> }
                </div>

                {/* Price */ }
                <div className="">
                    <label htmlFor="price">Price</label>
                    <input
                        className='input input-bordered w-full'
                        type="number"
                        { ...register("price", {
                            valueAsNumber: true,
                            required: "Price is required",
                            min: {
                                value: 0,
                                message: "Price must be greater than or equal to 0"
                            }
                        }) }
                    />
                    { errors.price && <p className="text-red-500">{ errors.price.message }</p> }
                </div>

                {/* Image */ }
                <div className="">
                    <label htmlFor="img">Image URL</label>
                    <input
                        className='input input-bordered w-full'
                        type="url"
                        { ...register("img", {
                            required: "Image URL is required",
                            pattern: {
                                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                                message: "Invalid image URL"
                            }
                        }) }
                    />
                    { errors.img && <p className="text-red-500">{ errors.img.message }</p> }
                </div>

                {/* Description */ }
                <div className="">
                    <label htmlFor="desc">Description</label>
                    <textarea
                        className='textarea textarea-bordered w-full'
                        { ...register("desc", { required: "Description is required" }) }
                    />
                    { errors.desc && <p className="text-red-500">{ errors.desc.message }</p> }
                </div>

                {/* Location */ }
                <div className="">
                    <label htmlFor="location">Location</label>
                    <textarea
                        className='textarea textarea-bordered w-full'
                        { ...register("location", { required: "Location is required" }) }
                    ></textarea>
                    { errors.location && <p className="text-red-500">{ errors.location.message }</p> }
                </div>

                {/* Quantity */ }
                <div className="">
                    <label htmlFor="qty">Quantity</label>
                    <input
                        className='input input-bordered w-full'
                        type="number"
                        { ...register("qty", {
                            valueAsNumber: true,
                            required: "Quantity is required",
                            min: {
                                value: 0,
                                message: "Quantity must be greater than or equal to 0"
                            }
                        }) }
                    />
                    { errors.qty && <p className="text-red-500">{ errors.qty.message }</p> }
                </div>

                <button className='btn btn-info mt-4' type="submit">Submit</button>
            </form>

        </div>

    );
}

export function ProductAddTrolleyClientUser({ product }: { product: TProductDB }) {
    const { push, incrementProduct, decrementProduct, message, counter } = useTrolley()

    const onPushTrolley = () => {
        push.mutate(product)
    }

    return (
        <>
            <button className="w-full btn btn-outline flex items-center"
                    onClick={ () => {
                        // @ts-ignore
                        return document.getElementById('modal_product_detail_user').showModal();
                    } }
            >
                <ShoppingCart /> <span className={ 'text-lg' }> Add Trolley</span>
            </button>
            <dialog id="modal_product_detail_user" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Trolley </h3>
                    <div className="py-4">
                        { message && (
                            <p className="text-red-500">
                                { message }
                            </p> ) }
                    </div>
                    <div className="">
                        <div className="card card-compact bg-base-200 ">
                            <div className="card-body ">
                                <div className="flex justify-between">

                                    <div className="">
                                        <div className="card-title">
                                            { product.name }
                                        </div>
                                        <p className="">
                                            { toRupiah(product.price) }
                                        </p>

                                    </div>

                                    <div className="card-action">
                                        <div className="flex items-center gap-4">
                                            <button className={ 'btn btn-square btn-neutral' }
                                                    onClick={ decrementProduct }
                                            >
                                                <Minus />
                                            </button>
                                            <h1 className={ 'text-xl' }>{ counter }</h1>
                                            <button
                                                disabled={ product.qty === counter }
                                                className={ 'btn btn-square btn-neutral' }
                                                onClick={ incrementProduct }
                                            >
                                                <Plus />
                                            </button>
                                        </div>
                                        { product.qty === counter &&
                                          <p className={ 'text-error' }>Product is Max to Add</p> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action justify-between">
                        <h1 className="text-xl">
                            Total { toRupiah(product.price * counter) }
                        </h1>
                        <div className=" flex flex-row gap-2">
                            <button
                                onClick={ onPushTrolley }
                                className="btn btn-info"
                            >
                                Add Trolley
                            </button>

                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */ }
                                <button className="btn btn-error">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </>

    )
}
