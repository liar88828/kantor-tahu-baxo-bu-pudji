import { CheckoutClientUser } from "@/app/components/checkout/checkout.client";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { Suspense } from "react";

export default async function Page() {
    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <CheckoutClientUser />
        </Suspense>
    )
}
