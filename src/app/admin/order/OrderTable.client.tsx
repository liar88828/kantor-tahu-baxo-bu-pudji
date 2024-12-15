'use client'
import React, { startTransition, useRef, useState } from 'react';
import { LoadingSpin } from "@/app/components/LoadingData";
import { toStatus } from "@/utils/status";
import { toDate } from "@/utils/formatDate";
import { toRupiah } from "@/utils/toRupiah";
import { Filter, NotebookTabs, Pencil, Search, Trash } from "lucide-react";
import { TOrderTransactionDB } from "@/entity/transaction.model";
import Link from "next/link";
import { useTableStore } from "@/store/table";

function OrderTable({ data }: { data: TOrderTransactionDB[] }) {
	const { setTable, existTable, search, setSearch, status: statusTable, tableDetail } = useTableStore()
	const [ selectedOrders, setSelectedOrders ] = useState<string[]>([]);

	const tableRef = useRef(null);


	return (<>
			<FilterDialog/>

			<div className="flex justify-between items-center gap-2">
				<div className="join w-full ">
					<input
						className="input input-bordered join-item w-full"
						onChange={ (e) => setSearch(e.target.value) }
						placeholder="Search"/>

					<button
						className="btn join-item ">
						<Search/>
					</button>

					<button
						className="btn join-item "
						onClick={ () => {
							// @ts-ignore
							document.getElementById('my_modal_filter').showModal()
						} }>
						<Filter/>
					</button>
				</div>

				<div className=" flex flex-nowrap gap-2">


					{/* Open the modal using document.getElementById('ID').showModal() method */ }


					<Link href={ '/admin/order/create' } className={ 'btn ' }>Create</Link>


				</div>

			</div>
			<div>
				{/*<button onClick={ onDownload }>Download</button>*/ }
				<div className="overflow-x-auto mt-2">

					<table className="table table-xs" ref={ tableRef }>
						<thead>
						<tr>
							<th>
								<label>
									<input
										type="checkbox"
										className="checkbox checkbox-sm"
										onChange={ (e) => {
											startTransition(() => {
												if (e.target.checked) {
													setSelectedOrders(data.map((order) => order.id));
												} else {
													setSelectedOrders([]);
												}
											})
										} }
										checked={
											data && selectedOrders.length === data.length
										}
									/>
								</label>
							</th>
							<th>ID</th>
							<th>Order Time</th>
							<th>Send Time</th>
							<th>Status</th>
							{/**/ }
							<th>Name (Customer)</th>
							<th>Address</th>
							{ tableDetail.description && (
							<th>Description</th>
							) }
							{/**/ }
							{ tableDetail.receiver && (<>
								<th className={ 'bg-orange-100' }>Name (Receiver)</th>
								<th className={ 'bg-orange-100' }>Address (Receiver)</th>
								<th className={ 'bg-orange-100' }>Phone (Receiver)</th>
							</>)
							}
							{/**/ }
							{ tableDetail.deliver && (<>
								<th className={ 'bg-green-100' }>Name (Delivery)</th>
								<th className={ 'bg-green-100' }>Phone (Delivery)</th>
							</>) }
							{/**/ }
							{ tableDetail.payment && (<>
								<th className={ 'bg-red-100' }>Name (Payments)</th>
								<th className={ 'bg-red-100' }>Type (Payments)</th>
							</>) }
							{/**/ }
							<th className={ 'bg-yellow-100 ' }>Name (Product)</th>
							<th className={ 'bg-yellow-100' }>Price (Product)</th>
							{/**/ }
							<th className={ 'bg-red-100' }>Price (Payments)</th>
							<th className={ 'bg-green-100' }>Price Delivery</th>

							<th>Total All</th>
							<th className={ 'w-24' }>Action</th>
						</tr>
						</thead>
						<tbody>
						{
							!data
								? <LoadingSpin/>
								: data
								.filter((order) => {
									console.log(statusTable);
									const nameOrder = order.nameCs.toLowerCase().includes(search.toLowerCase());
									const statusOrder = order.status.includes(statusTable);
									return nameOrder && statusOrder;
								})
								.map((order) => (
									<tr key={ order.id }>
										<td>
											<label>
												<input
													type="checkbox"
													className="checkbox checkbox-sm"
													checked={
														// isChecked(order.id) ||
														existTable(order.id) }
													onChange={ () => {
														setTable(order)
														// handleCheckboxChange(order.id)
													} }
												/>
											</label>
										</td>
										<td>{ order.id }</td>
										<td>{ toDate(order.orderTime || 0) }</td>
										<td>{ toDate(order.sendTime || 0) }</td>
										<td>
											{
												<span className={ `badge badge-${ toStatus(order.status) }` }>
												{ order.status }
											</span>
											}
										</td>
										{/**/ }
										<td>{ order.nameCs }</td>
										<td>{ order.address }</td>
										{ tableDetail.description && (
										<td className={ 'line-clamp-2' }>{ order.desc }</td>
										) }
										{/**/ }
										{ tableDetail.receiver &&
											(<>
												<td className={ 'bg-orange-50' }>{ order.Receivers.name }</td>
												<td className={ 'bg-orange-50' }>{ order.Receivers.address }</td>
												<td className={ 'bg-orange-50' }>{ order.Receivers.phone }</td>
											</>) }
										{/**/ }
										{ tableDetail.deliver &&
											(<>
												<td className={ 'bg-green-50' }>{ order.nameDelivery }</td>
												<td className={ 'bg-green-50' }>{ order.phoneDelivery }</td>
											</>) }
										{/**/ }
										{ tableDetail.payment &&
											(<>
												<td className={ 'bg-red-50' }>{ order.Payments.name }</td>
												<td className={ 'bg-red-50' }>{ order.Payments.type }</td>
											</>) }
										{/**/ }
										<td className={ 'bg-yellow-50 ' }>{ order.Trolleys.map(d => (
											<span key={ d.id } className={ 'text-nowrap' }>
												{ d.Product.name } x { d.qty_at_buy } <br/>
											</span>
										)) }</td>
										<td className={ 'bg-yellow-50' }>{ order.Trolleys.map(d => toRupiah(d.price_at_buy)).join(', \n') }</td>
										{/**/ }
										<td className={ 'bg-red-50' }>{ toRupiah(order.totalPayment) }</td>
										<td className={ 'bg-green-50' }>{ toRupiah(order.priceDelivery) }</td>
										<td>{ toRupiah(order.totalAll) }</td>
										<td className={ 'grid grid-cols-2 gap-2 w-24' }>
											<Link
												href={ `/admin/order/${ order.id }` }
												className={ 'btn btn-sm btn-square' }>
												<NotebookTabs/>
											</Link>
											<button className={ 'btn btn-sm btn-info btn-square' }>
												<Pencil/>
											</button>
											<button className={ 'btn btn-sm btn-error btn-square' }>
												<Trash/>
											</button>
										</td>
									</tr>
								)) }
						</tbody>
					</table>
				</div>
			</div>
		</>

	);
}

export default OrderTable;

export function FilterDialog() {
	const { setStatus, data, setTableDetail, tableDetail } = useTableStore()

	return (
		<dialog id="my_modal_filter" className="modal ">
			<div className="modal-box ">
				<h3 className="font-bold text-lg">Filter</h3>

				<div className=" ">

					<label className="">
						<span>Select Status</span>
						<select className="select select-bordered w-full"
								onChange={ (e) => setStatus(e.target.value) }
						>
							<option value={ '' }>All</option>
							<option value="Pending">Pending</option>
							<option value="Fail">Fail</option>
							<option value="Completed">Completed</option>
						</select>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="checkbox checkbox-sm"
							checked={ tableDetail.description }
							onChange={ () => {
								setTableDetail({ description: !tableDetail.description })
							} }
						/>
						<span>Description</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="checkbox checkbox-sm"
							checked={ tableDetail.receiver }
							onChange={ () => {
								setTableDetail({ receiver: !tableDetail.receiver })
							} }
						/>
						<span>Receiver</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="checkbox checkbox-sm"
							checked={ tableDetail.payment }
							onChange={ () => {
								setTableDetail({ payment: !tableDetail.payment })
							} }
						/>
						<span>Payment</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="checkbox checkbox-sm"
							checked={ tableDetail.deliver }
							onChange={ () => {
								setTableDetail({ deliver: !tableDetail.deliver })
							} }
						/>
						<span>Deliver</span>
					</label>

					<div className="mt-2 space-x-2">
						<h2>Selected Data : { data.length }</h2>
						<Link href={ '/admin/order/export/excel' }
							  className={ 'btn ' }>Export</Link>
						<Link href={ '/admin/order/print' } className={ 'btn btn-error' }>Delete</Link>
					</div>
				</div>

				<div className="modal-action">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */ }
						<button className="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>
	);
}
