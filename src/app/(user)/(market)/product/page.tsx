import React, { Suspense } from 'react';
import { ProductFetchClientUser, ProductLayoutClientUser } from "@/app/components/product/product.client";
import { PageLoadingSpin } from "@/app/components/LoadingData";

export default function Page() {
    return (
        <ProductLayoutClientUser>
            <Suspense fallback={ <PageLoadingSpin /> }>
                <ProductFetchClientUser />
            </Suspense>
        </ProductLayoutClientUser>
    )
}
