import React from 'react'
import { PRODUCT } from "@/hook/useProduct";
import { ProductListClientAdmin, ProductSearchClientAdmin } from "@/app/components/product/product.client";
import { TContext } from "@/interface/server/param";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSearchName } from "@/utils/requestHelper";
import { productAll } from "@/network/product";

export default async function page(context: TContext) {
    const search = await getSearchName(context, 'search') ?? ''
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [ PRODUCT.KEY, search ],
        queryFn: () => productAll({
            pagination: { limit: 50 },
            filter: { name: search }
        })
    })

    return (
        <ProductSearchClientAdmin>
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <ProductListClientAdmin />
            </HydrationBoundary>
        </ProductSearchClientAdmin>
    )
}
