import React, { Suspense } from "react";
import { OrderFormCreate } from "@/app/components/order/OrderForm.client";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { validSession } from "@/server/lib/db";

export default async function OrderForm() {
    const { userId } = await validSession()
    // console.log(userId)
    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <OrderFormCreate id_customer={ userId } />
        </Suspense>
    )
}
