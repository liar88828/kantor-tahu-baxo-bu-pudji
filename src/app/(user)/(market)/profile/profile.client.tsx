'use client'
import React from 'react'
import { BookMarked, LogOut, LucideClock, ShoppingCartIcon, Truck, } from 'lucide-react';
import { Users } from "@prisma/client";
import { logout } from "@/server/lib/state";

export function UserProfile({ user }: { user: Users }) {

    return (
        <div className="card card-compact bg-base-300">
            <div className="card-body">
                <div className="justify-between flex">

                    <h2 className='card-title'>{ user.name }</h2>
                    <form action={ logout }>
                        <button className='btn  btn-square btn-sm btn-error'>
                            <LogOut/>
                        </button>
                    </form>

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

    );
}

