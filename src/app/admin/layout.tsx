'use client'
import type {ReactNode} from "react";
import {Car, ChevronLeft, CreditCard, HomeIcon, LucidePackageSearch,} from 'lucide-react';
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";


export default function Layout({children,}: { children: ReactNode }) {
    const path = usePathname()
    console.log(path)
    const router = useRouter()
    return (<>
            <div className="navbar bg-base-300 fixed ">
                <div className="flex-1">
                    <button
                        onClick={() => router.back()}
                        className="btn btn-ghost text-xl">
                        <ChevronLeft/>
                    </button>
                </div>
                <div className="flex-none">

                </div>
            </div>
            <div className="container pt-12">
                {children}
            </div>
            <div className="btm-nav z-50">
                <Link href={'/admin/home'}
                      className={path.includes('/admin/home') ? "active" : ""}>
                    <HomeIcon/>
                    <span className="btm-nav-label">Home</span>
                </Link>

                <Link href={'/admin/product'}
                      className={path.includes('/admin/product') ? "active" : ""}>
                    <LucidePackageSearch/>
                    <span className="btm-nav-label">Product</span>
                </Link>

                <Link href={'/admin/delivery'}
                      className={path.includes('/admin/delivery')  ? "active" : ""}>
                    <Car/>
                    <span className="btm-nav-label">Delivery</span>
                </Link>
                <Link href={'/admin/payment'}
                      className={path.includes('/admin/payment') ? "active" : ""}>
                    <CreditCard/>
                    <span className="btm-nav-label">Payment</span>
                </Link>

            </div>
        </>

    )
}
