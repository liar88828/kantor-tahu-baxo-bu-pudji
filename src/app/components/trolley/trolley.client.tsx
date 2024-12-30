'use client'
import useTrolleyStore from "@/store/trolley";
import { PageErrorData } from "@/app/components/PageErrorData";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { toTotal } from "@/utils/toCalculate";
import { useRouter } from "next/navigation";
import { useTrolley } from "@/hook/useTrolley";
import { TrolleyDropDownPageUser } from "@/app/components/trolley/trolley.page";

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
        <TrolleyDropDownPageUser
            total={ toTotal.subTotal(data.data) }
            count={ data.count }
            hrefAction={ () => router.push('/trolley') }
        />
    )
}

export function TrolleyCheckoutCaseUser() {
    const router = useRouter()
    const { onSelected, onTotalProduct } = useTrolleyStore()
    const onCheckout = () => {
        if (onSelected) {
            router.push('/checkout')
        }
    }

    return (
        <TrolleyDropDownPageUser
            total={ onTotalProduct }
            count={ onSelected.length }
            hrefAction={ () => onCheckout() }
        />
    )
}
