import React from 'react'
import DeliveryList, { DeliverySearch } from "@/app/admin/delivery/DeliveryList.client";
import { deliveryAll } from "@/network/delivery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DELIVERY } from "@/hook/useDelivery";
import { TContext } from "@/interface/server/param";
import { getSearchName } from "@/utils/requestHelper";

export const dynamic = 'force-dynamic';

export default async function page(context: TContext) {
    const search = await getSearchName(context, 'search') ?? ''

    const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
        queryKey: [ DELIVERY.KEY, search ],
        queryFn: () => deliveryAll({
            filter: { name: search },
            pagination: {}
        }),
	});

	return (
        <DeliverySearch>
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <DeliveryList/>
            </HydrationBoundary>
        </DeliverySearch>
	)
}
