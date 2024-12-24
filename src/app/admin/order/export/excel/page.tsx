'use client'
import React from "react";
import { toRupiah } from "@/utils/toRupiah";
import { toDate } from "@/utils/formatDate";
import { useTableStore } from "@/store/table";
import { useTable } from "@/hook/useTable";


const Test = () => {
	const { tableRef, onDownload } = useTable()
	const { data: dataTable } = useTableStore()

	return (
		<div className={ 'container-none' }>
			<button onClick={ onDownload } className={ 'btn btn-info' }>
				Download
			</button>
			<div className="overflow-x-auto mt-2">
				<table className="table table-xs" ref={ tableRef }
					   data-theme={ 'light' }
				>
					<thead>
					<tr>
						<th>ID</th>
						<th>Order Time</th>
						<th>Send Time</th>
						<th>Status</th>
						{/**/ }
						<th>Address</th>
						<th>Description</th>
						<th className={ 'bg-green-200' }>Name (Delivery)</th>
						<th className={ 'bg-green-200' }>Phone (Delivery)</th>
						<th className={ 'bg-green-200' }>Price Delivery</th>
						{/**/ }
                        <th className={ 'bg-orange-200' }>Name (Customer)</th>
                        <th className={ 'bg-orange-200' }>Address (Customer)</th>
                        <th className={ 'bg-orange-200' }>Phone (Customer)</th>
						{/**/ }
						<th className={ 'bg-red-200' }>Name (Payments)</th>
						<th className={ 'bg-red-200' }>Type (Payments)</th>
						<th className={ 'bg-red-200' }>Price (Payments)</th>
						{/**/ }
						<th className={ 'bg-yellow-200' }>Name (Product)</th>
						<th className={ 'bg-yellow-200' }>Qty (Product)</th>
						<th className={ 'bg-yellow-200' }>Price (Product)</th>
						<th>Total All</th>
					</tr>
					</thead>
					<tbody>
					{ dataTable.map((order) => (
						<tr key={ order.id }>
							<td>{ order.id }</td>
							<td>{ toDate(order.orderTime || 0) }</td>
							<td>{ toDate(order.sendTime || 0) }</td>
							<td> { order.status }</td>
							<td>{ order.address }</td>
							<td className={ 'line-clamp-2' }>{ order.desc }</td>
							<td className={ 'bg-green-100' }>{ order.nameDelivery }</td>
							<td className={ 'bg-green-100' }>{ order.phoneDelivery }</td>
							<td className={ 'bg-green-100' }>{ toRupiah(order.priceDelivery) }</td>
							{/**/ }
							<td className={ 'bg-orange-100' }>{ order.Customers.name }</td>
							<td className={ 'bg-orange-100' }>{ order.Customers.address }</td>
							<td className={ 'bg-orange-100' }>{ order.Customers.phone }</td>
							{/**/ }
							<td className={ 'bg-red-100' }>{ order.Payments.name }</td>
							<td className={ 'bg-red-100' }>{ order.Payments.type }</td>
							<td className={ 'bg-red-100' }>{ toRupiah(order.totalPayment) }</td>
							{/**/ }
							<td className={ 'bg-yellow-100' }>{ order.Trolleys.map(d => d.Product.name).join(', \n') }</td>
							<td className={ 'bg-yellow-100' }>{ order.Trolleys.map(d => d.qty_at_buy).join(', \n') }</td>
							<td className={ 'bg-yellow-100' }>{ order.Trolleys.map(d => toRupiah(d.price_at_buy)).join(', \n') }</td>

							<td>{ toRupiah(order.totalAll) }</td>
						</tr>
					)) }
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Test