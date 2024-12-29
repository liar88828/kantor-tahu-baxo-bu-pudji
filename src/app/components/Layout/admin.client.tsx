'use client'
import React from 'react';
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import { useScrollVisibility } from "@/hook/UseScrollVisibility";
import { TrolleyCase, TrolleyCount } from "@/app/(user)/trolley.client";
import { menuUser } from "@/assets/MenuList";

function AdminClient() {
    const router = useRouter()
    return (
        <button
            onClick={ () => router.back() }
            className="btn btn-ghost text-xl">
            <ChevronLeft/>
        </button>
    );
}

export default AdminClient;

export function NavbarUser() {
    const showNavbar = useScrollVisibility(true);

    return (
        <div
            className={ `navbar bg-base-200/50 fixed top-0 start-0 z-20 w-full transition-transform duration-300 ${
                showNavbar ? 'translate-y-0' : '-translate-y-full'
            }` }
        >
            <div className="flex-1">
                <AdminClient/>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={ 0 } role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <ShoppingCart/>
                            <TrolleyCount/>
                        </div>
                    </div>
                    <div
                        tabIndex={ 0 }
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <TrolleyCase/>
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
            className={ `btm-nav z-50 sm:hidden bg-base-200/50 fixed bottom-0 w-full transition-transform duration-300 ${
                showBottomNav ? 'translate-y-0' : 'translate-y-full'
            }` }
        >
            { menuUser.map((item) => (
                <Link
                    href={ item.href }
                    key={ item.title }
                    className={ path === item.href ? "active" : "" }>
                    { item.icon }
                    <span className="btm-nav-label">{ item.title }</span>
                </Link>
            )) }
        </div>
    );
}

