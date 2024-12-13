import React from 'react'
import DeliveryList from "@/app/admin/delivery/DeliveryList.client";
import { deliveryAll } from "@/network/delivery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const dynamic = 'force-dynamic';
export default async function page() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [ 'delivery' ],
		queryFn: deliveryAll,
	});

	return (
		<HydrationBoundary state={ dehydrate(queryClient) }>
			<DeliveryList/>
		</HydrationBoundary>
	)
}
