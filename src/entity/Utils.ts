export type ToModel = "bank" | "orderan" | "product" | "travel" | "dashboard" | "semuaProduk";
export type TMethod = "PUT" | "POST" | "GET" | "DELETE" | "PATCH";
export type TRes<T> = { msg: string, data: T }
