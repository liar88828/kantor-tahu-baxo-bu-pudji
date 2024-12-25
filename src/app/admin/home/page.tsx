import React from 'react'
import { EarningServer, GridData, RecentProduct, TopCustomers, TopOrder } from "@/app/admin/home/card.server";

export default async function page() {

	return (
		<div className="grid md:grid-cols-8 lg:grid-cols-4 grid-cols-1 gap-2 md:gap-5 w-full px-3  mb-32">
			<div className="md:col-span-5 lg:col-span-3 md:space-y-5 space-y-2">
				<GridData/>
				<EarningServer/>
				<TopOrder/>
			</div>
			<div className="md:col-span-3 lg:col-span-1 md:space-y-5 space-y-2 ">
				<TopCustomers/>
                <RecentProduct/>
			</div>
		</div>
	)
}
