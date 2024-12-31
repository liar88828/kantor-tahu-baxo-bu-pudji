import { LowPriceProduct, NewProduct, PopularProduct } from "@/app/components/home/home.server";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProductHomeCategoryUser } from "@/app/components/home/home.client";
import { Suspense } from "react";

export default async function Page() {
    return (
        <div className={ 'space-y-2' }>
            <Suspense fallback={ <PageLoadingSpin /> }>
                <ProductHomeCategoryUser />
            </Suspense>
            <Suspense fallback={ <PageLoadingSpin /> }>
                <NewProduct />
                {/**/ }
                <Suspense fallback={ <PageLoadingSpin /> }>
                    <LowPriceProduct />
                    {/**/ }
                    <Suspense fallback={ <PageLoadingSpin /> }>
                        <PopularProduct />
                    </Suspense>
                </Suspense>
            </Suspense>
        </div>
    )
}
