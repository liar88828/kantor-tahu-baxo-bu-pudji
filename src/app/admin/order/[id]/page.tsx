'use client'

import { usePrint } from "@/hook/usePrint";
import { useParams } from "next/navigation";
import { EmptyData } from "@/app/components/ErrorData";
import { LoadingSpin } from "@/app/components/LoadingData";
import { toDate } from "@/utils/formatDate";
import { toRupiah } from "@/utils/toRupiah";
import Link from "next/link";
import { useOrder } from "@/hook/useOrder";

export default function DetailedInvoicePrint() {
	const param = useParams<{ id: string }>()
	const { getId, onDelete } = useOrder()
	const { data: order, isLoading, isError } = getId(param.id)
	const { isPrinting, handlePrint, contentRef } = usePrint()
	const handleDelete = () => {
		onDelete.mutate(param.id)
	}

	if (!order || isLoading) return <LoadingSpin/>
	if (isError) return <EmptyData page={ `Order Detail ${ param.id }` }/>

	return (
        <div className={ ` mx-auto sm:p-4 ${ isPrinting ? 'w-[50rem]' : "" } pb-20 max-w-[210mm]` }>
			{ <div
				className="mb-4 card  card-compact sm:card-normal bg-white card-bordered text-xs sm:text-base">
				<div
					ref={ contentRef }
					className={ 'card-body' }

				>
					<div className=" card-title text-2xl font-bold pb-10">Invoice #{ order.data.id }</div>
					<div className="grid  grid-cols-2 gap-4 mb-4">
						<div>
							<p className="font-semibold">Order Date:</p>
							<p>{ toDate(order.data.orderTime ?? 0) }</p>
						</div>
						<div>
							<p className="font-semibold">Send Date:</p>
							<p>{ toDate(order.data.sendTime ?? 0) }</p>
						</div>
						<div>
							<p className="font-semibold">Customer:</p>
							<p>{ order.data.Customers.name }</p>
							<p>{ order.data.Customers.address }</p>
							<p>{ order.data.Customers.phone }</p>
						</div>
					</div>
					<div className="mb-4">
						<p className="font-semibold">Description:</p>
						<p>{ order.data.desc }</p>
					</div>
					<table className="w-full mb-4 ">
						<thead>
						<tr className="border-b">
							<th className="text-left">Product</th>
							<th className="text-right">Qty</th>
							<th className="text-right">Unit Price</th>
							<th className="text-right">Total</th>
						</tr>
						</thead>
						<tbody>
						{ order.data.Trolleys.map((item) => (
							<tr key={ item.id } className="border-b">
								<td>{ item.Product.name }</td>
								<td className="text-right">{ item.qty_at_buy }</td>
								<td className="text-right">{ toRupiah(item.price_at_buy) }</td>
								<td className="text-right">{ toRupiah(item.qty_at_buy * item.price_at_buy) }</td>
							</tr>
						)) }
						</tbody>
					</table>
					<div className={ `grid  ${ isPrinting ? 'grid-cols-2' : "grid-cols-1 sm:grid-cols-2" }` }>
						<div className=""></div>

						<div className="mt-4">
							<div className="flex justify-between">
								<span className="font-semibold">Subtotal:</span>
								<span>{ toRupiah(order.data.totalPayment) }</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Delivery Fee:</span>
								<span>{ toRupiah(order.data.priceDelivery) }</span>
							</div>
							<div className="flex justify-between font-bold">
								<span>Total:</span>
								<span>{ toRupiah(order.data.totalAll) }</span>
							</div>
						</div>

						<div className="mt-4">
							<p className="font-semibold">Delivery Information:</p>
							<p>Name: { order.data.Deliverys.name }</p>
							<p>Phone: { order.data.Deliverys.phone }</p>
							<p>Address: { order.data.Deliverys.address }</p>
							<p>Type: { order.data.Deliverys.type }</p>
						</div>
						<div className="mt-4">
							<p className="font-semibold">Payment Information:</p>
							<p>Method: { order.data.Payments.name }</p>
							<p>Type: { order.data.Payments.type }</p>
							<p>Payment:{ order.data.totalPayment }</p>
						</div>
					</div>

					<div className="mt-4">
						<p className="font-semibold">Status: { order.data.status }</p>
					</div>

					<div className=" card-actions flex justify-center print:hidden">
						<button onClick={ handlePrint } disabled={ isPrinting } className={ 'btn btn-info' }>
							{ isPrinting ? 'Printing...' : 'Print Invoice' }
						</button>

						<Link
							href={ `/admin/order/update/${ param.id }` }
							hidden={ isPrinting }
							className={ 'btn btn-warning' }>
							Update
						</Link>
						<button

							onClick={ handleDelete }
							disabled={ isPrinting || onDelete.isPending }
								className={ 'btn btn-error' }>
							Delete
						</button>
					</div>
				</div>
			</div>
			}
		</div>
	)
}

