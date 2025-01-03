import React, { Suspense } from 'react';
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { TContext } from "@/interface/server/param";
import { getId, getSearchName } from "@/utils/requestHelper";
import { InvoiceCheckServer } from "@/app/components/invoice/invoice.server";

export default async function Page(context: TContext) {

    const paramsRedirect = await getSearchName(context, 'redirect')
    const id = await getId(context)

    console.log(paramsRedirect)

    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <InvoiceCheckServer paramsRedirect={ paramsRedirect } idOrder={ id } />
        </Suspense>
    );
}
