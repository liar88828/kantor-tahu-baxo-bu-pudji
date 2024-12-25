import { orderAll } from "@/network/order";
import OrderTable, { FilterDialog, OrderSearch } from "@/app/admin/order/OrderTable.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ORDER_KEY } from "@/hook/useOrder";
import React from "react";

export const dynamic = 'force-dynamic';

async function Page() {
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
            <FilterDialog/>
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <OrderTable/>
            </HydrationBoundary>
        </OrderSearch>
	);
}

export default Page;