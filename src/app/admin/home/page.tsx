import React from 'react'
import { Earning } from "@/app/admin/home/card.client";
import { GridData, RecentOrders, TopCustomers, TopOrder } from "@/app/admin/home/card.server";
import { toFetch } from "@/hook/toFetch";
import { ResponseMonthData } from "@/server/repository/order.repo";
export const dynamic = 'force-dynamic';

export default async function page() {
	const earningDataNew=await toFetch<ResponseMonthData>('GET','order?year=2024')
	const earningDataOld=await toFetch<ResponseMonthData>('GET','order?year=2023')
	return (
		<div className="grid md:grid-cols-7 lg:grid-cols-4 grid-cols-1 gap-2 md:gap-5 w-full px-3  mb-32">
			<div className="md:col-span-4 lg:col-span-3 md:space-y-5 space-y-2">
				<GridData/>
				<Earning
					year_new={earningDataNew.data}
					year_old={earningDataOld.data}
				/>
				<TopOrder/>
			</div>
			<div className="md:col-span-3 lg:col-span-1 md:space-y-5 space-y-2 ">
				<TopCustomers/>
				<RecentOrders/>
			</div>
		</div>
	)
}
