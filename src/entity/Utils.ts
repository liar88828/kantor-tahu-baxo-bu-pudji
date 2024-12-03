export type ToModel = "table" | "payment" | "orderan" | "product" | "travel" | "dashboard" |'order'|'transaction'|'not implement'|'delivery';
export type TMethod = "PUT" | "POST" | "GET" | "DELETE" | "PATCH";
export type TRes<T> = { msg: string, data: T }
