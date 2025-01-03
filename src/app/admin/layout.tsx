import { BaseLayoutAdmin } from "@/app/components/Layout/admin.client";
import { Metadata } from "next";
import { ReactNode } from "react";
import { getSession } from "@/server/lib/db";
import { prisma } from "@/config/prisma";
import { STATUS } from "@/app/components/status";

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
}

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await getSession()
    const isLogin = !!session

    const orderCount = await prisma.orders.count({
        where: {
            status: STATUS.PENDING,
        }
    })
    return (
        <BaseLayoutAdmin
            orderCount={ orderCount }
            isLogin={ isLogin }
        >
            { children }
        </BaseLayoutAdmin>
    )

}
