import React from "react";
import { PageErrorData } from "@/app/components/PageErrorData";
import { PaymentDetailPageAdmin, PaymentHistoryPageAdmin } from "@/app/components/payment/payment.page";
import { paymentHistory, paymentId } from "@/network/payment";

export async function PaymentDetailServerAdmin({ idPayment }: { idPayment: string }) {
    const { data: payment } = await paymentId(idPayment)
    if (!payment) {
        return <PageErrorData code={ 404 } msg={ 'Data Payment is Empty' } />
    }
    return <PaymentDetailPageAdmin payment={ payment } />
}

export async function PaymentHistoryServerAdmin({ idPayment }: { idPayment: string }) {
    const { data: payment } = await paymentHistory(idPayment)
    if (!payment) {
        return <PageErrorData code={ 404 } msg={ 'Data Payment is Empty' } />
    }
    return (
        <PaymentHistoryPageAdmin payments={ payment } />
    );
}
