import { toRupiah } from "@/utils/toRupiah";
import { productRecent } from "@/network/product";
import { receiverAll } from "@/network/receiver";
import React from "react";
import { toDate } from "@/utils/formatDate";
import { toStatus } from "@/app/components/status";
import { EarningClient } from "@/app/admin/dashboard/card.client";
import { getEarningNew, getEarningOld, orderMonthTotal, orderTopTotal } from "@/network/order";
import { OrderMonthTotal } from "@/interface/entity/transaction.model";

export async function GridData() {
    const dataComplete = await orderMonthTotal('Complete')
    const dataProcess = await orderMonthTotal('Pending')
    const dataFail = await orderMonthTotal('Fail')

	return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
		<GridCardChild
            data={ dataProcess.data }
			classNames={ 'bg-warning/10' }
		/>
		<GridCardChild
            data={ dataComplete.data }
			classNames={ 'bg-success/10' }
		/>
		<GridCardChild
            data={ dataFail.data }
			classNames={ 'bg-error/10' }
		/>

	</div>
}

export function GridCardChild({ classNames, data }: { data: OrderMonthTotal, classNames: string }) {
	return (
        <div className={ `card  ${ classNames }  2xl:card-normal card-compact` }>
			<div className="card-body">
				<div className=" flex md:flex-col xl:flex-row justify-around items-end md:items-start xl:items-end">
					<div className="">
                        <h1 className={ 'font-bold ~text-2xl/3xl' }>{ toRupiah(data.totalAll) }</h1>
                        <p className={ 'text-base-content/50 ~text-xs/base' }>Total Customers</p>
					</div>
					<div className="">
                        <h2 className="text-xl font-bold  text-end sm:text-end md:text-start xl:text-end ">{ data.count }</h2>
                        <p className={ 'text-base-content/50 ~text-xs/base text-nowrap  text-start md:text-end' }>This
                            Mouth</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function TopOrder() {
    const { data: orders } = await orderTopTotal()

	return <div className="card bg-base-200/30 card-compact md:card-normal">
		<div className="card-body ">
			<h2 className="card-title">Top Order</h2>
			<div className="overflow-x-auto">
				<table className="table  w-full table-auto table-xs md:table-md">
					<thead>
					<tr>
						<th>Img</th>
						<th>Status</th>
						<th>Name</th>
                        <th>Total Product</th>
                        <th>Total Price</th>

				</tr>
				</thead>
				<tbody>
				{ orders.map(order => (
					<tr key={ order.id }>
						<td>
							{/* eslint-disable-next-line @next/next/no-img-element */ }
							<img
								className={ 'rounded-2xl w-20' }
                                src="https://picsum.photos/200" alt={ order.Customers.name }/>
						</td>
						<td>
                            <div className=" space-y-1">
                                <p className={ ` badge badge-outline badge-${ toStatus(order.status) }` }>{ order.status }</p>
                                <p className={ '~text-xs/base' }>{ toDate(order.sendTime) }</p>
                            </div>
						</td>
                        <td>{ order.Customers.name }</td>
                        <td>{ order.Trolleys.reduce((total, item) => {
                            return total + item.qty_at_buy
                        }, 0) }</td>
                        <td>{ toRupiah(order.totalAll) }</td>
                        {/*<td>{ order.nameDelivery }</td>*/ }
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

export async function RecentProduct() {
    const { data: products } = await productRecent()
    // console.log(products)
	return <div className="card card-compact  bg-base-200/30 ">
		<div className="card-body">
			<h2 className="card-title">Recent Product</h2>
			<div className="divider m-0"></div>

            { products.map(item => (
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

export async function EarningServer() {
    const year = new Date().getFullYear()
    const earningDataNew = await getEarningNew(year)
    const earningDataOld = await getEarningOld(year)
	return (
		<EarningClient
			year_new={ earningDataNew.data }
			year_old={ earningDataOld.data }
		/>
	);
}

