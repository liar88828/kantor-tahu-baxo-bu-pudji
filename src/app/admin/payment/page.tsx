import React from 'react'
import { PaymentListClientAdmin, PaymentSearchClientAdmin } from "@/app/components/payment/payment.client";

export default function page() {
    return (
        <PaymentSearchClientAdmin>
            <PaymentListClientAdmin />
        </PaymentSearchClientAdmin>
    )
}
