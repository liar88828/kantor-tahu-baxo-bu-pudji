export type ToModel =
	"table"
	| "payment"
	| "orderan"
	| "product"
	| "travel"
	| "dashboard"
	| 'order'
	| 'transaction'
	| 'not implement'
	| 'delivery'
	| 'trolley'
	| 'receiver'
	| 'employee'
	| "user"

export enum ROLE {
    USER = "USER",
    ADMIN = "ADMIN"
}


export type TMethod = "PUT" | "POST" | "GET" | "DELETE" | "PATCH";
export type TRes<T> = { msg: string, data: T }
export type StatusOrder = 'Fail' | 'Complete' | 'Pending'
const data = <T extends ToModel>( to: T ): T => {
  return to;
};
data<'table'>( 'table' )