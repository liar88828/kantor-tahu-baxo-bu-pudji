/* eslint-disable react-hooks/rules-of-hooks */
import { ProductParams, TProductCreate, TProductDB, UpdateStock } from "@/interface/entity/product.model"
import { toFetch } from "@/hook/toFetch"
import { ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";

export const productAll = async ({ pagination, filter }: ProductParams) => {
    const url = toUrl('product', { ...pagination, ...filter })
    // console.log(response)
    return await toFetch<ResponseAll<TProductDB>>('GET', {
        url,
        cacheData: {
            cache: "no-cache",
            next: { revalidate: 0 }
        }
    })
}

export const productRecent = async () => {
    return toFetch<TProductDB[]>('GET', {
        url: "product/recent",
        cacheData: {
            next: {
                revalidate: 60 * 5
            }
        }
    })
}

export const productId = async (id: string) => {
    return toFetch<TProductDB>('GET', { url: `product/${ id }` })
}

export const productNew = async ({ filter, pagination }: ProductParams) => {
    const newUrl = toUrl('product', { ...filter, ...pagination })
    return toFetch<ResponseAll<TProductDB>>('GET', {
        url: newUrl,
        cacheData: { next: { revalidate: 60 * 2 } }
    })
}

export const productCreate = async (data: TProductCreate) => {
    return toFetch('POST', { url: `product`, data })
}

export const productUpdate = async (data: TProductCreate, id: string) => {
    return toFetch('PUT', { url: `product/${ id }`, data })
}

export const productDelete = async (id: string) => {
    return toFetch('DELETE', { url: `product/${ id }` })
}

export const productUpdateStock = async (data: Omit<UpdateStock, 'id'>, id: string) => {
    return toFetch('PATCH', {
        url: `product/${ id }`, data
    })
}