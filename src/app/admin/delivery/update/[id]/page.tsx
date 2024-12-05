import React from 'react'
import DeliveryForm from '../../DeliveryForm.client'
import {exampleDeliveryCreate} from '@/assets/ExampleDelivery'
import {deliveryUpdate} from '@/network/delivery'
import type {TDeliveryCreate} from '@/entity/delivery.model'
import type {TContext} from '@/interface/server/param'
import {getId} from '@/lib/requestHelper'


export default async function page(context: TContext) {

    const id = await getId(context)
    const onSubmit = async (value: TDeliveryCreate) => {
        'use server'
        await deliveryUpdate(value, id)
    }

    return (
        <DeliveryForm
            onSubmitAction={onSubmit}
            defaultValues={
                exampleDeliveryCreate
                // await deliveryId(id)
            }
        />
    )
}
