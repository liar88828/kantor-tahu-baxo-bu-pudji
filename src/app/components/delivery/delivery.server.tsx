import React from "react";
import { DeliveryDetailHistoryPageAdmin, DeliveryDetailPageAdmin } from "@/app/components/delivery/delivery.page";
import { PageErrorData } from "@/app/components/PageErrorData";
import { deliveryId } from "@/network/delivery";
import { DeliveryFormClientAdmin } from "@/app/components/delivery/delivery.client";

export async function DeliveryDetailServerAdmin({ idDelivery }: { idDelivery: string }) {
    const { data: delivery } = await deliveryId(idDelivery)
    if (!delivery) {
        return <PageErrorData code={ 404 } msg={ 'Data Delivery is Empty' } />
    }
    return <DeliveryDetailPageAdmin delivery={ delivery } />
}

export async function DeliveryDetailHistoryServerAdmin({ idDelivery }: { idDelivery: string }) {
    const { data: delivery } = await deliveryId(idDelivery)
    if (!delivery) {
        return <PageErrorData code={ 404 } msg={ 'Data History Delivery is Empty' } />
    }
    return <DeliveryDetailHistoryPageAdmin delivery={ delivery } />
}

export async function DeliveryFormUpdateServerAdmin({ idDelivery }: { idDelivery: string }) {
    const { data } = await deliveryId(idDelivery)
    if (!data) {
        return <PageErrorData code={ 404 } msg={ 'Data Delivery is Empty' } />
    }
    return (
        <DeliveryFormClientAdmin
            defaultValues={ data }
            method={ 'PUT' }
            id={ idDelivery }
        />
    )
}
