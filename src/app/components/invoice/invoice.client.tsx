'use client'
import Link from "next/link";
import React from "react";
import { Invoice } from "@/app/components/invoice/invoice.page";
import { TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { usePathname } from "next/navigation";
import { usePrint } from "@/hook/usePrint";

export function InvoiceLayout({ redirectAction, order }: { redirectAction: string, order: TOrderTransactionDB }) {
    const { isPrinting, handlePrint, contentRef } = usePrint()
    const path = usePathname()

    return ( <>
            <div ref={ contentRef }>
                <Invoice
                    path={ path }
                    invoice={ order }
                />
            </div>

            <div className="print:hidden mt-5 space-x-5 p-5">
                <button
                    onClick={ handlePrint }
                    disabled={ isPrinting }
                    className={ 'btn btn-info' }
                >
                    { isPrinting ? 'Printing...' : 'Print Invoice' }
                </button>
                <Link
                    href={ redirectAction }
                    hidden={ isPrinting }
                    className={ 'btn ' }
                >
                    Back
                </Link>
            </div>
        </>

    );
}
