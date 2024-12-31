import React from 'react'
import { PRODUCT } from "@/interface/entity/product.model";
import { ProductListClientAdmin, ProductSearchClientAdmin } from "@/app/components/product/product.client";
import { TContext } from "@/interface/server/param";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/components/Layout/ReactQueryProvider.server";
import { getSearchName } from "@/utils/requestHelper";
import { productAll } from "@/network/product";

export default async function page(context: TContext) {
    const search = await getSearchName(context, 'search') ?? ''
    const queryClient = getQueryClient()
    const isKey = [ PRODUCT.KEY, search ]
    // console.log(isKey, 'is server')
    await queryClient.prefetchQuery({
        queryKey: isKey,
        queryFn: () => productAll({
            pagination: {},
            filter: { name: search }
        })
    })

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <ProductSearchClientAdmin>
                <ProductListClientAdmin />
            </ProductSearchClientAdmin>
        </HydrationBoundary>
    )
}
