'use client'
import Link from 'next/link';
import React from 'react';
import { DollarSign, ShoppingCart } from "lucide-react";
import { TrolleyCase, TrolleyCheckoutCaseUser, TrolleyCount } from "@/app/components/trolley/trolley.client";
import { menuUser } from "@/assets/MenuList";
import { usePathname } from "next/navigation";
import { useScrollVisibility } from "@/hook/UseScrollVisibility";
import { BackButton } from "@/app/components/Layout/backButton";
import { TTrolleyProductUser } from "@/interface/entity/trolley.model";

export function NavbarUser() {
    const showNavbar = useScrollVisibility(true);

    return (
        <div
            className={ `navbar bg-base-200/50 fixed top-0 start-0 z-20 w-full transition-transform duration-300 ${
                showNavbar ? 'translate-y-0' : '-translate-y-full'
            }` }
        >
            <div className="flex-1">
                <BackButton />
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={ 0 } role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <ShoppingCart />
                            <TrolleyCount />
                        </div>
                    </div>
                    <div
                        tabIndex={ 0 }
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                    >
                        <TrolleyCase />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function NavButtonUser() {
    const path = usePathname()
    const showBottomNav = useScrollVisibility(true);

    return (
        <div
            className={ `btm-nav z-50 sm:hidden bg-base-200/50 fixed bottom-0 w-full transition-transform duration-300 
            ${ showBottomNav ? 'translate-y-0' : 'translate-y-full' }` }
        >
            { menuUser.map((item) => (
                <Link
                    href={ item.href }
                    key={ item.title }
                    className={ path === item.href ? "active" : "" }
                >
                    { item.icon }
                    <span className="btm-nav-label">{ item.title }</span>
                </Link>
            )) }
        </div>
    );
}

export function HeaderTransaction({ path, onSelected }: {
    path: string,
    onSelected: TTrolleyProductUser[]
}) {
    return <div className="navbar bg-base-300 fixed z-50">
        <div className="flex-1 ">
            <BackButton />
        </div>
        <div className="flex-none">
            { path.includes("/trolley") && (
                <div className="dropdown dropdown-end">
                    <div tabIndex={ 0 } role="button" className="btn btn-ghost btn-square">
                        <div className="indicator">
                            <DollarSign />
                            <span className="badge badge-sm indicator-item">
                                { onSelected.length }
                            </span>
                        </div>
                    </div>
                    <div tabIndex={ 0 }
                         className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                    >
                        <TrolleyCheckoutCaseUser />
                    </div>
                </div>
            ) }
        </div>
    </div>;
}
