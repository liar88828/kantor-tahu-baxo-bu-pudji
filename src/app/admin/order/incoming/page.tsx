import React from 'react';
import { prisma } from "@/config/prisma";
import { STATUS } from "@/app/components/status";
import { OrderIncomingPage } from "@/app/components/order/order.client";

export default async function Page() {
    const invoices = await prisma.orders.findMany({
        take: 10,
        where: {
            status: STATUS.PENDING
        },
        include: {
            Trolleys: {
                include: {
                    Product: true
                }
            }
        },
        orderBy: {
            updated_at: 'desc'
        }
    })

    return (
        <div className="overflow-y-auto  space-y-2">
            { invoices.map((invoice) => (
                <OrderIncomingPage key={ invoice.id } invoice={ invoice } />
            )) }
        </div>
    );
}
