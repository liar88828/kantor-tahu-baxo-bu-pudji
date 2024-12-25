'use client'
import React from 'react'
import { Pen, Plus, Trash } from 'lucide-react'
import { toRupiah } from '@/utils/toRupiah'
import Link from 'next/link'
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { ErrorData } from "@/app/components/ErrorData";
import { LoadingSpin } from "@/app/components/LoadingData";
import { DELIVERY, useDelivery } from "@/hook/useDelivery";
import { useDeliveryStore } from "@/store/delivery";
import { useDebounce } from "@/hook/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseAll } from "@/interface/server/param";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { PAYMENT } from "@/hook/usePayment";

export default function DeliveryList() {
    const { search } = useDeliveryStore()
    const searchDebounce = useDebounce(search)
	const { onDelete, getAll } = useDelivery()
    const { data: deliverys, isLoading, isError } = getAll({
        pagination: {},
        filter: { name: searchDebounce },
    }, searchDebounce === search)

    if (!deliverys || isLoading) return <LoadingSpin/>
    if (deliverys.length === 0 || isError) return <ErrorData code={ 404 } msg={ 'Data Delivery is Empty' }/>

    return (

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mb-20 ">
            { deliverys.map(delivery => (
						<DeliveryCard
							key={ delivery.id }
							delivery={ delivery }
                            onClick={ () => onDelete(delivery.id) }
                        />
            ))
            }
				</div>

    )
}

export function DeliverySearch({ children }: { children: React.ReactNode }) {
    const { search, setSearch } = useDeliveryStore()
    const queryClient = useQueryClient();
    const deliverys = queryClient.getQueryData<{ data: ResponseAll<TDeliveryDB> }>([ DELIVERY.KEY, '' ])
    return (
        <>
            <div className="flex justify-between mb-4 gap-3">
                <input
                    type="text"
                    className='input input-bordered w-full'
                    placeholder='search...'
                    value={ search }
                    onChange={ e => setSearch(e.target.value) }
                    list={ 'deliverys' }
                />
                <datalist id="deliverys">
                    { deliverys?.data.data
                    .slice(0, 10)
                    .map((item) => (
                        <option
                            key={ item.id }
                            value={ item.name }>
                            { item.name }
                        </option>
                    )) }
                </datalist>
                <Link href={ '/admin/delivery/create' } className='btn btn-square'>
                    <Plus/>
                </Link>
            </div>
            { children }
        </>
    );
}

export function DeliveryCard(props: { delivery: TDeliveryDB, onClick: () => Promise<void> }) {
    return <div className="card card-side card-compact bg-base-200 ">
        <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */ }
            <img
                src="https://picsum.photos/200/300?random=1"
                alt="Movie"
                className="rounded-xl object-cover w-32 h-32 "
			/>
		</figure>
		<div className="card-body">
			<div className="flex justify-between h-full">
				<h2 className="card-title">{ props.delivery.name }</h2>
			</div>
			<div className="flex justify-between items-end">
				<div className="">
					<p>{ toRupiah(props.delivery.price) }</p>
					<p>{ props.delivery.address }</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={ props.onClick }
						className=" btn btn-square btn-error btn-sm ">
						<Trash/>
					</button>
					<Link href={ `/admin/delivery/update/${ props.delivery.id }` }
						  className=" btn btn-square btn-info btn-sm ">
						<Pen/>
					</Link>
				</div>
			</div>
		</div>
	</div>;
}
