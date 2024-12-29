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
	;
export type TMethod = "PUT" | "POST" | "GET" | "DELETE" | "PATCH";
export type TRes<T> = { msg: string, data: T }

const data = <T extends ToModel>( to: T ): T => {
  return to;
};
data<'table'>( 'table' )