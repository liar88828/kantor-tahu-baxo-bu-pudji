'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { toRupiah } from "@/utils/toRupiah";
import Link from "next/link";

export function PageErrorData({ msg = 'Error Load', code = 404, }: { msg?: string, code?: number }) {
    const router = useRouter()
    return (
        <div className="card w-96 md:w-full shadow bg-base-200/40">
            <div className="card-body items-center text-center">
                <h2 className="card-title">Error { code }</h2>
                <p>{ msg }</p>
                <div className="card-actions justify-end">
                    <button onClick={ () => router.refresh() } className="btn btn-primary">Reload</button>
                    <button onClick={ () => router.back() } className="btn btn-ghost">Back</button>
                </div>
            </div>
        </div>
    );
}
export function PageErrorDataTrolley() {
    return (
        <div className="card-body">
            <span className="text-lg font-bold">{ 0 } Items</span>
            <span className="text-info">Subtotal: { toRupiah(0) }</span>
            <div className="card-actions">
                <Link
                    href={ '/login' }
                    className="btn btn-primary btn-block"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export function EmptyData(
    { page }: { page: string }) {
    return (
        <PageErrorData msg={ `${ page } Data Is Empty` } code={ 404 } />
    );
}

export function PageEmptyData(
    { page }: { page: string }) {
    return (
        <div className={ 'flex w-full justify-center' }>
            <PageErrorData msg={ `${ page } Data Is Empty` } code={ 404 } />
        </div>
    );
}
