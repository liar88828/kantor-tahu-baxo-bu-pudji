import React from 'react'
import { toRupiah } from "@/utils/toRupiah";
import { receiverAll } from "@/network/receiver";
import { orderGet } from "@/network/order";
import { Earning } from "@/app/components/home/earning";
import { productAll } from "@/network/product";

export default async function page() {
  return (
	  <div className="grid grid-cols-4 gap-5 w-full px-3  ">
		  <div className="col-span-3 space-y-5">
			  <GridData/>
			  <Earning/>
			  <TopProduct/>
		  </div>
		  <div className="col-span-1 space-y-5">
			  <TopCustomers/>
			  <RecentOrders/>
		  </div>
	  </div>
  )
}

export function GridData() {
	return <div className="grid grid-cols-3 gap-5">
		<div className="card card-bordered bg-base-200  shadow ">
			<div className="card-body">
				<h1 className={ 'font-bold text-6xl' }>{ toRupiah(10) }</h1>
				<p className={ 'text-base-content/50' }>total Customers</p>
				<div className="">
					<h2 className="card-title ">30%</h2>
					<p className={ 'text-base-content/50' }>this Mouth</p>
				</div>
			</div>
		</div>

		<div className="card card-bordered bg-base-200  shadow">
			<div className="card-body">
				<h1 className={ 'font-bold text-6xl' }>{ toRupiah(10) }</h1>
				<p className={ 'text-base-content/50' }>total Customers</p>
				<div className="">
					<h2 className="card-title ">30%</h2>
					<p className={ 'text-base-content/50' }>this Mouth</p>
				</div>
			</div>
		</div>


		<div className="card card-bordered bg-base-200  shadow">
			<div className="card-body">
				<h1 className={ 'font-bold text-6xl' }>{ toRupiah(10) }</h1>
				<p className={ 'text-base-content/50' }>total Customers</p>
				<div className="">
					<h2 className="card-title ">30%</h2>
					<p className={ 'text-base-content/50' }>this Mouth</p>
				</div>
			</div>
		</div>


	</div>
}

export async function TopProduct() {
	const { data: products } = await productAll()

	return <div className="card bg-base-200  shadow">
		<div className="card-body ">
			<h2 className="card-title">Top Selling Product</h2>
			<table className="table table-zebra w-full table-auto ">
				<thead>
				<tr>
					<th>Img</th>
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
								className={ 'rounded-2xl w-24' }
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

export async function TopCustomers() {
	const { data: receivers } = await receiverAll()
	return <div className="card card-compact bg-base-200  shadow">
		<div className="card-body">
			<h2 className="card-title">Top Customers</h2>
			<div className="divider m-0"></div>
			{ receivers.data.map(item => (
				<div className="flex  items-center justify-between"
					 key={ item.id }>
					<div className="flex gap-2">
						<div className="avatar">
							<div className="w-8 rounded-full">
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
	return <div className="card card-compact bg-base-200 shadow">
		<div className="card-body">
			<h2 className="card-title">Recent Orders</h2>
			<div className="divider m-0"></div>

			{ orders.data.map(item => (
				<div className="flex  items-center justify-between"
					 key={ item.id }>
					<div className="flex gap-2">

						{/* eslint-disable-next-line @next/next/no-img-element */ }
						<div className="avatar">
							<div className="w-8 rounded-full">
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
