import React from 'react';
import { TContext } from "@/interface/server/param";
import { getId, getSearchName } from "@/utils/requestHelper";
import { InvoiceLayout } from "@/app/(secure)/invoice/invoice.client";
import { orderId } from "@/network/order";

async function Page(context: TContext) {
    const paramsRedirect = await getSearchName(context, 'redirect')
    const id = await getId(context)
    const order = await orderId(id)
    console.log(paramsRedirect)

    return (
        <InvoiceLayout redirectAction={ paramsRedirect } order={ order.data }/>
    );
}

export default Page;

