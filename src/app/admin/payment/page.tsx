'use client'
import React from 'react'
import { PaymentListClientAdmin, PaymentSearchClientAdmin } from "@/app/components/payment/payment.client";

export const dynamic = 'force-dynamic';

export default function page() {
    return (
        <PaymentSearchClientAdmin>
            <PaymentListClientAdmin />
        </PaymentSearchClientAdmin>
    )
}
