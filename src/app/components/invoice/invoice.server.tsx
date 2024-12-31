import React from 'react';
import { InvoiceLayout } from "@/app/components/invoice/invoice.client";
import { orderId } from "@/network/order";

export async function InvoiceServer({ idOrder, paramsRedirect }: { idOrder: string, paramsRedirect: string, }) {

    const order = await orderId(idOrder)

    return (
        <InvoiceLayout redirectAction={ paramsRedirect } order={ order.data } />
    );
}
