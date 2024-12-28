'use client'
import { MoveRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import { findHistoryUser } from "@/network/order";
import { useQuery } from "@tanstack/react-query";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { PageErrorData } from "@/app/components/PageErrorData";
import { toDate } from "@/utils/formatDate";
import { toRupiah } from "@/utils/toRupiah";
import { toStatus } from "@/app/components/status";

export function ProfileServer() {
    const { data: invoices, isError, isLoading, error } = useQuery({
        queryKey: [ 'Order', 'history' ],
        queryFn: findHistoryUser
    })

    if (isLoading || !invoices) return <PageLoadingSpin/>
    if (isError) return <PageErrorData msg={ error.message } code={ 404 }/>

    return (
        <div className="">
            <h2 className='card-title'>History</h2>
            <div className="space-y-1 overflow-y-auto h-[60vh] py-2">
                { invoices.data.map((invoice) => (
                    <div
                        key={ invoice.id }
                        className="card card-compact bg-base-300">
                        <div className="card-body">
                            <div className="flex justify-between">
                                <h2 className="card-title">#{ invoice.id }</h2>
                                <div className={ `badge badge-${ toStatus(invoice.status) }` }>{ invoice.status }</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="">
                                    <div className=" flex gap-2 mb-2">
                                        <p>Total Item: { invoice.Trolleys.length }</p>
                                        <p>Total Price: { toRupiah(invoice.totalAll) }</p>
                                    </div>
                                    <p>{ toDate(invoice.orderTime) }</p>
                                </div>
                                <Link
                                    href={ `/invoice/${ invoice.id }?redirect=/profile` }
                                    className=' btn btn-square'>
                                    <MoveRight/>
                                </Link>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </div>

    );
}