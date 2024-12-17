import React from 'react'
import { Earning } from "@/app/admin/home/card.client";
import { GridData, RecentOrders, TopCustomers, TopProduct } from "@/app/admin/home/card.server";
export const dynamic = 'force-dynamic';

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
