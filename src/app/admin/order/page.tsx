import React from "react";
import { FilterDialog, OrderSearch, OrderTable } from "@/app/components/order/OrderTable.client";
import { ORDER_KEY } from "@/hook/useOrder";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { orderAll } from "@/network/order";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [ ORDER_KEY.order ],
        queryFn: () => orderAll({
            filter: { name: "", status: "" },
            pagination: {}
        }),
    });

    return (
        <OrderSearch>
            <FilterDialog />
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <OrderTable />
            </HydrationBoundary>
        </OrderSearch>
    );
}
