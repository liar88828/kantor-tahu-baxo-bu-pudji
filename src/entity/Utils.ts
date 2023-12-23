export type TMethod = "PUT" | "POST" | "GET" | "DELETE" | "PATCH";
export type TRes<T> = { msg: string, data: T }
export type ToModel = "table" | "bank" | "orderan" | "product" | "delivery" | "dashboard" | "semuaProduk";

const data = <T extends ToModel>( to: T ): T => {
  return to;
};
data<'table'>( 'table' )