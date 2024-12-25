import React from 'react'
import ProductList, { ProductSearch } from "@/app/admin/product/ProductList.client";
import { productAll } from "@/network/product";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { TContext } from "@/interface/server/param";
import { getSearchName } from "@/utils/requestHelper";
import { PRODUCT } from "@/hook/useProduct";

export const dynamic = 'force-dynamic';

export default async function page(context: TContext) {
    const search = await getSearchName(context, 'search') ?? ''
    // const status = await getSearchName(context, 'status') ?? ''

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [ PRODUCT.KEY, search ],
        queryFn: () => productAll({
            pagination: { limit: 50 },
            filter: { name: search }
        })
    })

	return (
        <ProductSearch>
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <ProductList/>
            </HydrationBoundary>
        </ProductSearch>
	)
}
