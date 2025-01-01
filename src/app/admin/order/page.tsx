import React from "react";
import { FilterDialog, OrderSearch, OrderTableClientAdmin } from "@/app/components/order/OrderTable.client";
import { ORDER } from "@/interface/entity/order.model";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { orderAll } from "@/network/order";

export default async function Page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [ ORDER.KEY, '', '' ],
        queryFn: () => orderAll({
            filter: { name: "", status: "" },
            pagination: {
                limit: 10
            }
        }),
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <OrderSearch>
                <FilterDialog />
                <OrderTableClientAdmin />
            </OrderSearch>
        </HydrationBoundary>
    );
}
