import { toRupiah } from "@/utils/toRupiah";
import { productAll } from "@/network/product";
import { receiverAll } from "@/network/receiver";
import { orderAll } from "@/network/order";
import React from "react";
import { toDate } from "@/utils/formatDate";
import { toStatus } from "@/app/components/status";

export function GridData() {
	return <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5">

		<div className="card card-bordered bg-success/10 shadow-sm xl:card-normal card-compact">
			<div className="card-body">
				<div className=" flex md:flex-col xl:flex-row justify-around items-end md:items-start xl:items-end">
					<div className="">
						<h1 className={ 'font-bold ~text-2xl/6xl' }>{ toRupiah(10) }</h1>
						<p className={ 'text-base-content/50' }>total Customers</p>
					</div>
					<div className="">
						<h2 className="text-xl font-bold xl:text-end">30%</h2>
						<p className={ 'text-base-content/50' }>this Mouth</p>
					</div>
				</div>
			</div>
		</div>

		<div className="card card-bordered bg-warning/10 shadow-sm xl:card-normal card-compact">
			<div className="card-body">
				<div className=" flex md:flex-col xl:flex-row justify-around items-end md:items-start xl:items-end">
					<div className="">
						<h1 className={ 'font-bold ~text-2xl/6xl' }>{ toRupiah(10) }</h1>
						<p className={ 'text-base-content/50' }>total Customers</p>
					</div>
					<div className="">
						<h2 className="text-xl font-bold xl:text-end">30%</h2>
						<p className={ 'text-base-content/50' }>this Mouth</p>
					</div>
				</div>
			</div>
		</div>


		<div className="card card-bordered bg-error/10 shadow-sm xl:card-normal card-compact">
			<div className="card-body">
				<div className=" flex md:flex-col xl:flex-row justify-around items-end md:items-start xl:items-end">


					<div className="">
						<h1 className={ 'font-bold ~text-2xl/6xl' }>{ toRupiah(10) }</h1>
						<p className={ 'text-base-content/50' }>total Customers</p>
					</div>
					<div className="">
						<h2 className="text-xl font-bold xl:text-end">30%</h2>
						<p className={ 'text-base-content/50' }>this Mouth</p>
					</div>
				</div>
			</div>
		</div>


	</div>
}

// wil change order
export async function TopOrder() {
	const { data: orders } = await orderAll(5)

	return <div className="card bg-base-200/30 card-compact md:card-normal">
		<div className="card-body ">
			<h2 className="card-title">Top Order</h2>
			<div className="overflow-x-auto">
			<table className="table  w-full table-auto table-xs md:table-md">
				<thead>
				<tr>
					<th>Img</th>
					<th>Status</th>
					<th>Send</th>
					<th>Name</th>

					<th>Address</th>
					<th>Delivery</th>
					{/*<th>Total Product</th>*/}
					{/*<th>Total Price</th>*/}

				</tr>
				</thead>
				<tbody>
				{ orders.data.map(order => (
					<tr key={ order.id }>
						<td>
							{/* eslint-disable-next-line @next/next/no-img-element */ }
							<img
								className={ 'rounded-2xl w-20' }
								src="https://picsum.photos/200" alt={ order.nameCs }/>
						</td>
						<td>
							<p className={ ` badge badge-outline badge-${ toStatus(order.status) }` }>    { order.status }</p>
						</td>
						<td>{ toDate(order.sendTime) }</td>
						<td>{ order.nameCs }</td>

						<td>{ order.Receivers.address }</td>
						<td>{ order.nameDelivery }</td>
						{/*<td>{ order.Trolleys.length }</td>*/}
						{/*<td>{ order.totalAll }</td>*/}
					</tr>)) }
				</tbody>
			</table>
		</div>
		</div>
	</div>;
}

export async function TopCustomers() {
	const { data: receivers } = await receiverAll({ filter: {}, pagination: { limit: 5 } })
	return <div className="card card-compact bg-base-200/30  ">
		<div className="card-body">
			<h2 className="card-title">Top Customers</h2>
			<div className="divider m-0"></div>
			{ receivers.data.map(item => (
				<div className="flex  items-center justify-between"
					 key={ item.id }>
					<div className="flex gap-2">
						<div className="avatar">
							<div className="w-10 h-10 rounded-full">
								{/* eslint-disable-next-line @next/next/no-img-element */ }
								<img
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									alt={ item.id }
								/>
							</div>
						</div>
						<div className="">
							<h2 className="font-bold ">{ item.name }</h2>
							<p className={ 'text-base-content/50' }>{ 20 } Purchase</p>
						</div>
					</div>
					<div className="">
						<p className={ 'font-bold' }>{ toRupiah(2000) }</p>
					</div>
				</div>

			)) }
		</div>
	</div>;
}

// wil change product
export async function RecentOrders() {
	const { data: products } = await productAll({ pagination: { limit: 5 } })
	return <div className="card card-compact  bg-base-200/30 ">
		<div className="card-body">
			<h2 className="card-title">Recent Product</h2>
			<div className="divider m-0"></div>

			{ products.data.map(item => (
				<div className="flex  items-center justify-between"
					 key={ item.id }>
					<div className="flex gap-2">

						{/* eslint-disable-next-line @next/next/no-img-element */ }
						<div className="avatar">
							<div className="w-10 h-10 rounded-full">
								{/* eslint-disable-next-line @next/next/no-img-element */ }
								<img
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									alt={ item.id }
								/>
							</div>
						</div>
						<div className="">
							<h2 className="font-bold ">{ item.name }</h2>
							<p className={ 'text-base-content/50' }>{ item.type } </p>
						</div>
					</div>

					<div className="">
						<p className={ 'font-bold' }>{ item.qty }</p>
					</div>
				</div>

			)) }
		</div>
	</div>;
}
