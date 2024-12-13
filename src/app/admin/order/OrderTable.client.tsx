'use client'
import React, { useRef, useState } from 'react';
import { LoadingSpin } from "@/app/components/LoadingData";
import { toStatus } from "@/utils/status";
import { toDate } from "@/utils/formatDate";
import { toRupiah } from "@/utils/toRupiah";
import { Filter, NotebookTabs, Pencil, Search, Trash } from "lucide-react";
import { TOrderTransactionDB } from "@/entity/transaction.model";
import Link from "next/link";
import { useTableStore } from "@/store/table";

function OrderTable({ data }: { data: TOrderTransactionDB[] }) {
	const { setTable, existTable, search, setSearch, setStatus, status: statusTable } = useTableStore()
	const [ selectedOrders, setSelectedOrders ] = useState<string[]>([]);

	const tableRef = useRef(null);

	// const { onDownload } = useDownloadExcel({
	// 	currentTableRef: tableRef.current,
	// 	filename: 'Users table',
	// 	sheet: 'Users',
	// })

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
											if (e.target.checked) {
												setSelectedOrders(data.map((order) => order.id));
											} else {
												setSelectedOrders([]);
											}
										} }
										checked={
											data && selectedOrders.length === data.length
										}
									/>
								</label>
							</th>
							<th>ID</th>
							<th>Address</th>
							<th>Description</th>
							<th>Name (Customer)</th>
							<th>Name (Delivery)</th>
							<th>Phone (Delivery)</th>
							<th>Price Delivery</th>
							<th>Status</th>
							<th>Order Time</th>
							<th>Send Time</th>
							<th>Total Payment</th>
							<th>Total All</th>
							<th>Action</th>
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
										<td>{ order.address }</td>
										<td className={ 'line-clamp-2' }>{ order.desc }</td>
										<td>{ order.nameCs }</td>
										<td>{ order.nameDelivery }</td>
										<td>{ order.phoneDelivery }</td>
										<td>{ toRupiah(order.priceDelivery) }</td>
										<td>{
											<span className={ `badge badge-${ toStatus(order.status) }` }>
										{ order.status }
									</span>
										}</td>
										<td>{ toDate(order.orderTime || 0) }</td>
										<td>{ toDate(order.sendTime || 0) }</td>
										<td>{ toRupiah(order.totalPayment) }</td>
										<td>{ toRupiah(order.totalAll) }</td>
										<td className={ 'flex flex-wrap gap-2' }>
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
	const { setStatus, data } = useTableStore()

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
