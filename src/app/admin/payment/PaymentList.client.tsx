'use client'
import React from 'react'
import { Pen, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { TPaymentDB } from "@/interface/entity/payment.model";
import { toAccounting } from "@/utils/accounting";
import { ErrorData } from "@/app/components/ErrorData";
import usePayment from "@/hook/usePayment";

interface PaymentListProps {
	payments: TPaymentDB[]
}

export default function PaymentList({payments}: PaymentListProps) {
	const { onDelete } = usePayment()
	return (
		<div className='p-3'>
			<div className="flex justify-between my-4 gap-3">
				<input type="text" className='input input-bordered w-full' placeholder='search...'/>
				<Link href={'/admin/payment/create'} className='btn btn-square'>
					<Plus/>
				</Link>
			</div>
			{ payments.length === 0
				? <ErrorData code={ 404 } msg={ 'Data Payment is Empty' }/>
				: <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-20 ">

					{ payments.map(payment => (<PaymentCard
							key={ payment.id }
							payment={ payment }
							onClick={ () => onDelete(payment.id) }/>
					)) }
				</div> }
		</div>
	)
}

export function PaymentCard(props: { payment: TPaymentDB, onClick: () => Promise<void> }) {
	return <div

		className="card card-side card-compact bg-base-300 ">
		<figure className={ "p-1" }>
			{/* eslint-disable-next-line @next/next/no-img-element */ }
			<img
				src="https://picsum.photos/200/300?random=1"
				alt="Movie"
				className="rounded-xl object-cover w-32 h-32 "
			/>
		</figure>
		<div className="card-body">
			<div className="flex justify-between h-full">
				<h2 className="card-title">{ props.payment.name }</h2>
			</div>
			<div className="flex justify-between items-end">
				<div className="">
					<p>{ toAccounting(props.payment.accounting) }</p>
					<p>{ props.payment.phone }</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={ props.onClick }
						className=" btn btn-square btn-error btn-sm ">
						<Trash/>
					</button>
					<Link
						href={ `/admin/payment/update/${ props.payment.id }` }
						className=" btn btn-square btn-info btn-sm ">
						<Pen/>
					</Link>
				</div>
			</div>
		</div>
	</div>;
}
