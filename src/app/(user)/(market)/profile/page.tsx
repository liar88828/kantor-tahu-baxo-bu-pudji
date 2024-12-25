import React from 'react'
import { BookMarked, LogOut, LucideClock, MoveRight, ShoppingCartIcon, Truck, } from 'lucide-react';
import Link from 'next/link';
import { getUser } from "@/server/lib/db";
import { LoadingSpin } from "@/app/components/LoadingData";
import { prisma } from "@/config/prisma";
import { Users } from "@prisma/client";

export default async function page() {
    const user = await getUser()
    if (!user) return <LoadingSpin/>
    return (
        <div className="px-5 space-y-5 mb-28">
            <div className="card card-compact bg-base-300">
                <div className="card-body">
                    <div className="justify-between flex">

                        <h2 className='card-title'>{ user.name }</h2>
                        <Link href={ '/' } className='btn  btn-square btn-sm btn-error'>
                            <LogOut/>
                        </Link>
                    </div>

                    <div className="flex gap-2">
                        <p>{ user.email }</p>
                        <p>{ user.phone }</p>
                    </div>
                    <div className="pb-2">
                        <p className={ 'text-base-content/50 ~text-xs/base' }>
                            { user.address }
                        </p>
                    </div>
                    <>
                        <div className="flex justify-between">
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">99+</span>
                                <button className="btn btn-square">
                                    <ShoppingCartIcon/>
                                </button>
                            </div>
                            {/* for progress */ }
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">99+</span>
                                <button className="btn btn-square">
                                    <LucideClock/>
                                </button>
                            </div>
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">99+</span>
                                <button className="btn btn-square">
                                    <Truck/>
                                </button>
                            </div>
                            {/* for finish / history */ }
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">99+</span>
                                <button className="btn btn-square">
                                    <BookMarked/>

                                </button>
                            </div>
                        </div>
                    </>
                </div>
            </div>
            <OrderHistory user={ user }/>
        </div>
    )
}

export async function OrderHistory({ user }: { user: Users }) {
    const orderHistory = await prisma.orders.findMany(
        {
            where: { id_customer: user.id, },
            include: { Customers: true },
        }
    );
    return (
        <div className="">
            <h2 className='card-title'>History</h2>
            <div className="space-y-1 overflow-y-auto h-[60vh] py-2">
                { orderHistory.map(d => (
                    <div
                        key={ d.id }
                        className="card card-compact bg-base-300">
                        <div className="card-body">
                            <h2 className="card-title">#12312312312312</h2>
                            <div className="flex justify-between">
                                <div className="">
                                    <p>Lorem 12312312 </p>
                                    <p>{ new Date().toISOString() }</p>
                                </div>
                                <button className=' btn btn-square'>
                                    <MoveRight/>
                                </button>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </div>

    );
}

