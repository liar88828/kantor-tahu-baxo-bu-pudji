'use client'
import React from 'react'
import { Pen, Plus, Trash } from 'lucide-react'
import { toRupiah } from '@/utils/toRupiah'
import Link from 'next/link'
import { TProductDB } from "@/interface/entity/product.model";
import { ErrorData } from "@/app/components/ErrorData";
import { PRODUCT, useProduct } from "@/hook/useProduct";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { productAll } from "@/network/product";
import { LoadingSpin } from "@/app/components/LoadingData";
import { useProductStore } from "@/store/product";
import { useDebounce } from "@/hook/useDebounce";
import { toDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { THistoryOrder } from "@/interface/entity/transaction.model";
import { ResponseAll } from "@/interface/server/param";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { DELIVERY } from "@/hook/useDelivery";

export default function ProductList() {

	const { onDelete } = useProduct()
    const { search } = useProductStore()
    const searchDebounce = useDebounce(search, 500)

    const { data: products, isLoading, isError } = useQuery({
        enabled: searchDebounce === search,
        select: (data) => {
            return data.data.data
        },
        queryKey: [ PRODUCT.KEY, searchDebounce ],
        queryFn: () => productAll({
            pagination: { limit: 50 },
            filter: { name: searchDebounce }

        })
    })

    if (isLoading || !products) return <LoadingSpin/>
    if (isError) return <ErrorData/>
    if (products.length === 0) return <ErrorData code={ 404 } msg={ 'Data Payment is Empty' }/>
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mb-20 ">
            { products.map(product => (
                <ProductCard
                    key={ product.id }
                    onClick={ () => onDelete(product.id) }
                    product={ product }/>
            )) }
        </div>
    )
}

export function ProductSearch({ children }: { children: React.ReactNode }) {
    const { search, setSearch } = useProductStore()
    const queryClient = useQueryClient();
    const products = queryClient.getQueryData<{ data: ResponseAll<TProductDB> }>([ PRODUCT.KEY, '' ])
    return (<>
            <div className="flex justify-between mb-4 gap-3">
                <input
                    type="text"
                    className='input input-bordered w-full'
                    onChange={ e => setSearch(e.target.value) }
                    value={ search }
                    placeholder='search...'
                    list={ 'products' }

                />


                <datalist id="products">
                    { products?.data.data
                    .slice(0, 10)
                    .map((item) => (
                        <option
                            key={ item.id }
                            value={ item.name }>
                            { item.name }
                        </option>
                    )) }
                </datalist>
                <Link href={ '/admin/product/create' } className='btn btn-square'>
                    <Plus/>
                </Link>
            </div>
            { children }
        </>
    );
}

export function ProductDetails({ product }: { product: TProductDB }) {
    const { onDelete } = useProduct()
    const router = useRouter()
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="w-full lg:w-1/2">
                <img src="https://picsum.photos/300/200?random=1"
                     alt={ product.name }
                     className="rounded-lg h-auto w-full"
                />
            </figure>
            <div className="card-body w-full lg:w-1/2">
                <h2 className="card-title text-2xl font-bold">{ product.name }</h2>
                <p className="text-sm text-gray-500">Type: { product.type }</p>
                <p className="text-sm text-gray-500">Location: { product.location }</p>
                <p className="mt-4 text-gray-700">{ product.desc }</p>
                <div className="mt-4">
                    <p className="text-lg font-semibold">Price: ${ product.price.toFixed(2) }</p>
                    <p className="text-sm text-gray-500">Available Quantity: { product.qty }</p>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-500">Created At: { toDate(product.created_at) }</p>
                    <p className="text-sm text-gray-500">Updated At: { toDate(product.updated_at) }</p>
                </div>
                <div className="card-actions justify-end mt-6">
                    <button
                        onClick={ () => router.push(`/admin/product/update/${ product.id }`) }
                        className="btn btn-primary">Update
                    </button>
                    <button
                        onClick={ () => () => onDelete(product.id) }
                        className="btn btn-secondary">Delete
                    </button>
                </div>
            </div>
        </div>
    )
}


export function ProductCard(props: { product: TProductDB, onClick: () => Promise<void> }) {
    return <div
        className="card card-side card-compact bg-base-200 ">
        <Link href={ `/admin/product/${ props.product.id }` }>
			{/* eslint-disable-next-line @next/next/no-img-element */ }
			<img
				src="https://picsum.photos/200/300?random=1"
				alt="Movie"
				className="rounded-xl object-cover w-32 h-32 "
			/>
		</Link>
		<div className="card-body">
			<div className="flex justify-between h-full">
				<h2 className="card-title">{ props.product.name }</h2>
			</div>
			<div className="flex justify-between items-end">
				<div className="">
					<p>{ toRupiah(props.product.price) }</p>
					<p>{ props.product.type }</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={ props.onClick }
						className=' btn btn-square btn-error btn-sm '>
						<Trash/>
					</button>
					<Link
						href={ `/admin/product/update/${ props.product.id }` }
						className=" btn btn-square btn-info btn-sm ">
						<Pen/>
					</Link>
				</div>
			</div>
		</div>
	</div>;
}

export function ProductHistory({ historyProduct }: { historyProduct: THistoryOrder[] }) {
    return (
        <div className="mt-2 ">
            <h1 className={ 'text-2xl font-bold py-4' }>History</h1>
            <div className="space-y-3 overflow-y-scroll h-[80vw] pb-20">
                { historyProduct.map(historyProduct => (
                    <div key={ historyProduct.id } className={ 'card card-compact bg-base-200' }>
                        <div className="card-body">
                            <h2 className="card-title">#{ historyProduct.id }</h2>
                            <p className="">{ historyProduct.address }</p>
                            <p className="">{ historyProduct.Customers.name }</p>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}
