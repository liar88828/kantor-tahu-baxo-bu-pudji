import { TProductDB } from "@/interface/entity/product.model";

export type TContext = {
    searchParams: Promise<{ search: string, status: string, redirect: string }>,
    params: Promise<{ id: string, search: string, route: string }>
}

export type TReactFormHookComponent<T> = {
    defaultValues?: T,
    method: "POST" | "PUT",
    id: string,

};

export type FetchResponse<R> = Promise<{ msg: string; data: R; code: number }>
export type ResponseAll<T> = {
    data: T[],
    page: number,
    limit: number
}

export type PaginatedResponse = {
    data: TProductDB[];
    nextCursor: number; // Cursor for next page or null if no more data
};

export type PageParams = {
    pageParam?: string;
};

export type OTPValid = {
    email: string,
    otp: string
}

export type OTPGenerate = {
    email: string,
    time: Date
}


