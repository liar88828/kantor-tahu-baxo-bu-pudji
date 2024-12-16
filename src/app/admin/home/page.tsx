import React from 'react'
import { toRupiah } from "@/utils/toRupiah";
import { receiverAll } from "@/network/receiver";
import { orderGet } from "@/network/order";
import { Earning } from "@/app/components/home/earning";
import { productAll } from "@/network/product";

export default async function page() {
	return (
		<div className="grid md:grid-cols-4 grid-cols-1 gap-2 md:gap-5 w-full px-3  mb-32">
			<div className="md:col-span-3 md:space-y-5 space-y-2">
				<GridData/>
				<Earning/>
				<TopProduct/>
			</div>
			<div className="md:col-span-1 md:space-y-5 space-y-2">
				<TopCustomers/>
				<RecentOrders/>
			</div>
		</div>
	)
}

export function GridData() {
	return <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5">
		<div className="card card-bordered bg-success/10 shadow-sm xl:card-normal card-compact">
			<div className="card-body">
				<div className="md:flex-none flex justify-around items-end">
					<div className="">
						<h1 className={ 'font-bold text-6xl' }>{ toRupiah(10) }</h1>
						<p className={ 'text-base-content/50' }>total Customers</p>
					</div>
					<div className="">
						<h2 className="card-title ">30%</h2>
						<p className={ 'text-base-content/50' }>this Mouth</p>
					</div>
				</div>
			</div>
		</div>

		<div className="card card-bordered bg-warning/20  shadow-sm md:card-normal card-compact">
			<div className="card-body">
				<div className="md:flex-none flex justify-around items-end">
					<div className="">
						<h1 className={ 'font-bold text-6xl' }>{ toRupiah(10) }</h1>
						<p className={ 'text-base-content/50' }>total Customers</p>
					</div>
					<div className="">
						<h2 className="card-title ">30%</h2>
						<p className={ 'text-base-content/50' }>this Mouth</p>
					</div>
				</div>
			</div>
		</div>


		<div className="card card-bordered bg-error/20  shadow-sm md:card-normal card-compact">
			<div className="card-body">

				<div className="md:flex-none flex justify-around items-end">
					<div className="">
						<h1 className={ 'font-bold text-6xl' }>{ toRupiah(10) }</h1>
						<p className={ 'text-base-content/50' }>total Customers</p>
					</div>
					<div className="">
						<h2 className="card-title ">30%</h2>
						<p className={ 'text-base-content/50' }>this Mouth</p>
					</div>
				</div>
			</div>
		</div>


	</div>
}

// wil change order
export async function TopProduct() {
	const { data: products } = await productAll()

	return <div className="card bg-base-200/30 card-compact md:card-normal">
		<div className="card-body ">
			<h2 className="card-title">Top Selling Product</h2>

			<table className="table  w-full table-auto table-xs md:table-md">
				<thead>
				<tr>
					<th>Img</th>
					<th></th>
					<th>Name</th>
					<th>Type</th>
					<th>Price</th>
					<th>Qty</th>
					<th>Total Sales</th>
				</tr>
				</thead>
				<tbody>
				{ products.data.map(product => (
					<tr key={ product.id }>
						<td>
							{/* eslint-disable-next-line @next/next/no-img-element */ }
							<img
								className={ 'rounded-2xl w-20' }
								src="https://picsum.photos/200" alt={ product.name }/>
						</td>
						<td>{ product.name }</td>
						<td>{ product.type }</td>
						<td>{ product.price }</td>
						<td>{ product.qty }</td>
						<td>{ 123 }</td>
					</tr>)) }
				</tbody>
			</table>
		</div>
	</div>;
}
// wil change product
export async function TopCustomers() {
	const { data: receivers } = await receiverAll()
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

export async function RecentOrders() {
	const { data: orders } = await orderGet()
	return <div className="card card-compact  bg-base-200/30 ">
		<div className="card-body">
			<h2 className="card-title">Recent Orders</h2>
			<div className="divider m-0"></div>

			{ orders.data.map(item => (
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
							<h2 className="font-bold ">{ item.nameCs }</h2>
							<p className={ 'text-base-content/50' }>{ item.status } </p>
						</div>
					</div>

					<div className="">
						<p className={ 'font-bold' }>{ toRupiah(item.totalAll) }</p>
					</div>
				</div>

			)) }
		</div>
	</div>;
}
