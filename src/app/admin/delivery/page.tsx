import React from 'react'
import { DeliveryListClientAdmin, DeliverySearchClientAdmin } from "@/app/components/delivery/delivery.client";
import { TContext } from "@/interface/server/param";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { deliveryAll } from "@/network/delivery";
import { getSearchName } from "@/utils/requestHelper";
import { DELIVERY } from "@/interface/entity/delivery.model";

export default async function page(context: TContext) {
    const search = await getSearchName(context, 'search') ?? ''
    const isKey = [ DELIVERY.KEY, search ]
    // console.log('is server', isKey)
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: isKey,
        queryFn: () => deliveryAll({
            filter: { name: search },
            pagination: {}
        }),
    });

    return (
        <HydrationBoundary state={
            dehydrate(queryClient, {
                shouldDehydrateQuery: () => true
            }) }
        >
            <DeliverySearchClientAdmin>
                <DeliveryListClientAdmin />
            </DeliverySearchClientAdmin>
        </HydrationBoundary>
    )
}
