'use client'
import { TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { toRupiah } from "@/utils/toRupiah";
import React, { Ref } from "react";
import { usePrint } from "@/hook/usePrint";
import Link from "next/link";
import { setDateIndo } from "@/utils/formatDate";

export function InvoiceLayout({ redirectAction, order }: { redirectAction: string, order: TOrderTransactionDB }) {
    const { isPrinting, handlePrint, contentRef } = usePrint()

    return (<>
            <Invoice
                invoice={ order }
                ref={ contentRef }
                isPrinting={ isPrinting }
            />
            <div className="  print:hidden mt-5 space-x-5 p-5">
                <button onClick={ handlePrint } disabled={ isPrinting } className={ 'btn btn-info' }>
                    { isPrinting ? 'Printing...' : 'Print Invoice' }
                </button>
                <Link
                    href={ redirectAction }
                    hidden={ isPrinting }
                    className={ 'btn ' }>
                    Back
                </Link>

            </div>
        </>

    );
}

export const Invoice = ({ invoice, ref, isPrinting }: {
    ref: Ref<HTMLDivElement>
    invoice: TOrderTransactionDB
    isPrinting: boolean;
}) => {
    const {
        id,
        orderTime,
        desc,
        address,
        Trolleys,
        Customers,
        Deliverys,
        Payments,
        totalAll,
        status,
        totalPayment,
        priceDelivery
    } = invoice;

    // @ts-ignore

    return (
        <div className={ `p-6 bg-base-100 rounded-lg  print:p-14 print:shadow-none shadow-lg h-[297mm] relative` }
             ref={ ref }>
            <h1 className="text-2xl font-bold mb-4 text-center">Invoice</h1>
            <div className="border-b pb-4 mb-4">
                <div className="flex justify-between">
                    <p><span className="font-semibold">Invoice ID:</span> { id }</p>
                    <p><span className="font-semibold">Order Time:</span> { new Date(orderTime).toLocaleString() }</p>
                </div>
                <p><span className="font-semibold">Description:</span> { desc }</p>
                <p><span className="font-semibold">Delivery Address:</span> { address }</p>
            </div>

            <div className="border-b pb-4 mb-4">
                <h2 className="font-semibold text-lg mb-2">Customer Details</h2>
                <p><span className="font-semibold">Name:</span> { Customers.name }</p>
                <p><span className="font-semibold">Address:</span> { Customers.address }</p>
                <p><span className="font-semibold">Phone:</span> { Customers.phone }</p>
            </div>

            <div className="border-b pb-4 mb-4">
                <h2 className="font-semibold text-lg mb-2">Items</h2>
                <table className="table w-full border-collapse   ">
                    <thead>
                    <tr>
                        <th className={ 'border ' }>Product Name</th>
                        <th className={ 'border ' }>Quantity</th>
                        <th className={ 'border ' }>Price</th>
                        <th className={ 'border ' }>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    { Trolleys.map((item) => (
                        <tr key={ item.id }>
                            <td className={ 'border ' }>{ item.Product.name }</td>
                            <td className={ 'border ' }>{ item.qty_at_buy }</td>
                            <td className={ 'border ' }>${ item.price_at_buy.toFixed(2) }</td>
                            <td className={ 'border ' }>${ (item.qty_at_buy * item.price_at_buy).toFixed(2) }</td>
                        </tr>
                    )) }
                    </tbody>
                </table>
            </div>

            <div className="border-b pb-4 mb-4">
                <h2 className="font-semibold text-lg mb-2">Delivery Details</h2>
                <p><span className="font-semibold">Courier:</span> { Deliverys.name }</p>
                <p><span className="font-semibold">Phone:</span> { Deliverys.phone }</p>
                <p><span className="font-semibold">Type:</span> { Deliverys.type }</p>
            </div>

            <div className="border-b pb-4 mb-4">
                <h2 className="font-semibold text-lg mb-2">Payment Details</h2>
                <p><span className="font-semibold">Method:</span> { Payments.name }</p>
                <p><span className="font-semibold">Type:</span> { Payments.type }</p>
                <p><span className="font-semibold">Description:</span> { Payments.desc }</p>
            </div>

            <div className="flex justify-between">
                <div className="grid grid-cols-2">
                    <div><span className="font-semibold">Subtotal:</span></div>
                    <div><span>{ toRupiah(totalPayment) }</span></div>
                    <div className={ 'pr-5' }><span className="font-semibold">Delivery Fee:</span></div>
                    <div><span>{ toRupiah(priceDelivery) }</span></div>
                </div>

                <div className="">
                    <h2 className="font-bold text-xl">Total: ${ totalAll.toFixed(2) }</h2>
                    <p className="text-green-600 font-semibold">Status: { status }</p>
                </div>
            </div>
            <div className="absolute bottom-5 right-5">
                {/*@ts-ignore*/ }
                { setDateIndo(new Date()) }
            </div>

        </div>
    );
};