'use client'
import { useTrolley } from "@/hook/useTrolley";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { useRouter } from "next/navigation";
import { PageErrorData } from "@/app/components/PageErrorData";
import { toTotal } from "@/utils/toCalculate";
import { toRupiah } from "@/utils/toRupiah";
import useTrolleyStore from "@/store/trolley";

export function TrolleyCount() {
    const { count } = useTrolley()
    const { data, isLoading } = count()
    if (isLoading) return <PageLoadingSpin/>
    return (
        <span className="badge badge-sm indicator-item">{ data }</span>
    );
}

export function TrolleyCase() {
    const router = useRouter()
    const { getAll } = useTrolley()
    const { data, isError, isLoading } = getAll()
    if (isLoading || !data) return <PageLoadingSpin/>
    if (isError) return <PageErrorData code={ 401 } msg={ 'Data is Not Found' }/>

    return (
        <TrolleyDropDown
            total={ toTotal.subTotal(data.data) }
            count={ data.count }
            hrefAction={ () => router.push('/trolley') }
        />
    )
}

export function TrolleyDropDown({ count, total, hrefAction }: {
    hrefAction: () => void;
    count: number,
    total: number
}) {

    return (
        <div className="card-body">
            <span className="text-lg font-bold">{ count } Items</span>
            <span className="text-info">Subtotal: { toRupiah(total) }</span>
            <div className="card-actions">
                <button
                    onClick={ hrefAction }
                    className="btn btn-primary btn-block">
                    View cart
                </button>
            </div>
        </div>
    );
}

export function CheckoutCase() {
    const router = useRouter()

    const { onSelected, onTotalProduct } = useTrolleyStore()
    const onCheckout = () => {
        if (onSelected) {
            router.push('/checkout')
        }
    }

    return (
        <TrolleyDropDown
            total={ onTotalProduct }
            count={ onSelected.length }
            hrefAction={ () => onCheckout() }
        />
    )
}
