'use client'
import React, { useCallback, useEffect, useState } from 'react';
import useTrolleyStore from "@/store/trolley";
import { DeliveryActionDialog, PaymentActionDialog, ProductActionDialog } from "@/app/components/order/order.client";
import { OrderCreateClient } from "@/validation/order.valid";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { redirect } from "next/navigation";
import { toRupiah } from "@/utils/toRupiah";
import { useDeliveryStore } from "@/store/delivery";
import { useOrder } from "@/hook/useOrder";
import { useOrderStore } from "@/store/order";
import { usePaymentStore } from "@/store/payment";
import { useProductStore } from "@/store/product";
import { useReceiverStore } from "@/store/receiver";
import { ReceiverItemSelected } from "@/app/components/order/order.page";

function Page() {
    const { onUpsert } = useOrder()
    const { getAsyncReceiver, onReceiver } = useOrderStore();
    const receiver = useReceiverStore()
    const { onSelected } = useTrolleyStore();
    const { total: totalProduct, setProductStore } = useProductStore()
    const { delivery: dataDelivery } = useDeliveryStore()
    const { payment: dataPayment } = usePaymentStore()
    const [ desc, setDesc ] = useState('empty')
    const subtotal = useCallback(() => onSelected.reduce((total, item) => {
            return total + item.qty_at_buy * item.price_at_buy
        }, 0),
        [ onSelected ]
    )
    if (onSelected.length === 0) {
        redirect('/trolley')
    }

    const onSubmit = () => {
        if (!onReceiver || !dataDelivery || !dataPayment) {
            return;
        }
        receiver.setReceiver(onReceiver);
        setProductStore(onSelected)
        let data: OrderCreateClient = {
            id: '',
            id_customer: onReceiver.id ?? '',
            addressCs: onReceiver.address,
            desc: desc,
            nameDelivery: dataDelivery.name,
            phoneDelivery: dataDelivery.phone,
            priceDelivery: dataDelivery.price,
            orderTime: new Date(),
            sendTime: new Date(),
            status: "Pending",
            namePayment: dataPayment.name,
            totalPayment: 0,
            totalProduct,
            totalAll: subtotal() + dataDelivery.price,
            // totalAll
        }
        onUpsert.mutate({
            data,
            method: "POST",
            isClient: true
        })
        // console.log(data)
    };

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        getAsyncReceiver()
    }, [ getAsyncReceiver ])

    return (
        <>
            <div className="">
                <div className="px-2 mb-2">
                    <div className="flex justify-between">
                        <h1 className="card-title">User Receiver</h1>
                    </div>
                </div>
                <div className="rounded-xl bg-base-200">
                    { !onReceiver
                        ? <PageLoadingSpin />
                        : <ReceiverItemSelected onReceiver={ onReceiver } />
                    }
                </div>
            </div>
            <ProductActionDialog />
            <DeliveryActionDialog />
            <PaymentActionDialog />
            <div className="">
                <h2 className="font-bold text-sm/lg">Description</h2>
                <textarea
                    placeholder="Enter your desc"
                    className="textarea textarea-bordered w-full"
                    value={ desc }
                    onChange={ (e) => setDesc(e.target.value) }
                />
            </div>
            <div>
                <h2 className="text-lg font-semibold">Summary</h2>
                <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{ toRupiah(subtotal()) }</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>{ toRupiah(dataDelivery?.price ?? 0) }</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{ toRupiah(subtotal() + ( dataDelivery?.price ?? 0 )) }</span>
                    </div>
                </div>
                <button
                    disabled={ onUpsert.isPending }
                    className="mt-5 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={ onSubmit }
                >
                    Confirm Order
                </button>
            </div>
        </ >
    );
}

export default Page;
