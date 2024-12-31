import { toFetch } from "@/hook/toFetch";
import {
    HistoryUser,
    OrderMonthTotal,
    TOrderTopTotal,
    TOrderTransactionCreate,
    TOrderTransactionDB
} from "@/interface/entity/transaction.model";
import { FetchResponse, ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";
import { OrderParams, ResponseCreateOrderTransaction, ResponseMonthData } from "@/interface/entity/order.model";
import { TStatusOrder } from "@/interface/Utils";

export const orderCreate = (data: TOrderTransactionCreate) => toFetch<ResponseCreateOrderTransaction>('POST', {
    url: 'order',
    data
})

export const orderUpdate = (data: TOrderTransactionCreate, id: string) => toFetch<ResponseCreateOrderTransaction>('PUT', {
    url: `order/${ id }`, data
})

export const orderAll = ({ filter, pagination }: OrderParams) => {
    const url = toUrl('order', { ...filter, ...pagination })
    return toFetch<ResponseAll<TOrderTransactionDB>>('GET', { url })
}

export const orderId = (id: string) => toFetch<TOrderTransactionDB>('GET', {
    url: `order/${ id }`
})

export const orderDelete = (id: string) => toFetch('DELETE', {
    url: `order/${ id }`
})

export const orderMonthTotal = (status: TStatusOrder) => toFetch<OrderMonthTotal>('GET', {
    url: `order/month?status=${ status }`
    , cacheData: {
        next: {
            revalidate: 60 * 10
        }
    }
})

export const orderTopTotal = () => toFetch<TOrderTopTotal[]>('GET', {
    url: `order/top`,
    cacheData: {
        next: {
            revalidate: 60 * 10
        }
    }
})

export const getEarningOld = async (year: number) => {
    return fetch(`http://localhost:3000/api/order?year=${ year - 1 }`, {
        method: "GET",
        next: {
            revalidate: 60 * 60 * 24
        }
    }).then(res => {
        return res.json() as FetchResponse<ResponseMonthData>
    })
}

export const getEarningNew = async (year: number) => {
    return fetch(`http://localhost:3000/api/order?year=${ year }`, {
        method: "GET",
        next: {
            revalidate: 60 * 60
        }
    }).then(res => {
        return res.json() as FetchResponse<ResponseMonthData>
    })
}

export const findHistoryUser = async (status: string) => {
    const url = toUrl("history/user/order", { status: status, limit: 10 })

    return toFetch<HistoryUser[]>("GET",
        {
            url,
            cacheData: {
                next: { revalidate: 5 }
            }
        })
}
