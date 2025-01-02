import React from "react";
import { EarningClient } from "@/app/components/dashboard/dashboard.client";
import { getEarningNew, getEarningOld, orderMonthTotal, orderTopTotal } from "@/network/order";
import { productRecent } from "@/network/product";
import { receiverAll } from "@/network/receiver";
import {
    DashboardCustomerPage,
    DashboardOrderPage,
    DashboardProductPage,
    GridCardChild
} from "@/app/components/dashboard/dashboard.page";
import { TStatusOrder } from "@/interface/Utils";

export async function DashboardGridDataServerAdmin({ text, color }: { text: TStatusOrder, color: string }) {
    const response = await orderMonthTotal(text)
    return (
        <GridCardChild data={ response.data } classNames={ color } />
    )
}

export async function DashboardTopOrderServerAdmin() {
    const { data: orders } = await orderTopTotal()
    return (
        <DashboardOrderPage orders={ orders } />
    );
}

export async function DashboardTopCustomersServerAdmin() {
    const { data: receivers } = await receiverAll({ filter: {}, pagination: { limit: 5 } })
    return (
        <DashboardCustomerPage receivers={ receivers.data } />
    );
}

export async function DashboardRecentProductServerAdmin() {
    const { data: products } = await productRecent()
    return (
        <DashboardProductPage products={ products } />
    );
}

export async function DashboardEarningServerServerAdmin() {
    const year = new Date().getFullYear()
    const earningDataOld = await getEarningOld(year)
    const earningDataNew = await getEarningNew(year)
    // console.log(earningDataOld)
    // console.log(earningDataNew)
    return (
        <EarningClient
            year_new={ earningDataNew.data }
            year_old={ earningDataOld.data }
        />
    );
}