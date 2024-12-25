import React from 'react'
import PaymentList, { PaymentSearch } from "@/app/admin/payment/PaymentList.client";

export const dynamic = 'force-dynamic';

export default async function page() {
    // const {data: payments} = await paymentAll()
    return (
        <PaymentSearch>
            <PaymentList/>
        </PaymentSearch>
    )
}
