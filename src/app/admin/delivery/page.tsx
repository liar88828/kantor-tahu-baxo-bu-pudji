import React from 'react'
import { DELIVERY } from "@/hook/useDelivery";
import { DeliveryListClientAdmin, DeliverySearchClientAdmin } from "@/app/components/delivery/delivery.client";
import { TContext } from "@/interface/server/param";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { deliveryAll } from "@/network/delivery";
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
        <DeliverySearchClientAdmin>
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <DeliveryListClientAdmin />
            </HydrationBoundary>
        </DeliverySearchClientAdmin>
    )
}
