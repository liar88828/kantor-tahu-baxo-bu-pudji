import { OrderProduct } from "@prisma/client"
import { TOrderCreate, TOrderDB } from "@/entity/order.model"
import { TReceiverCreate, TReceiverDB } from "@/validation/receiver.valid"
import { TProductDB } from "@/entity/product.model";

export type TOrderProductDB = OrderProduct
export type TOrderProductList = (TOrderProductDB & { Product: TProductDB })

export type TOrderProductCreateTransaction = Omit<
	OrderProduct,
	"id" | "id_order" | 'qty'
>

export type TOrderProductCreate = Omit<
	OrderProduct,
	"id" | "id_order"
>


export type TOrderProductUpdate = Omit<
	OrderProduct,
	"id" | "id_order" | "id_user"
>

export type TOrderProductCount = Omit<
	OrderProduct,
	"id" | "id_order" | "id_user" | 'qty'
>


// export type TOrderProductCreate = Omit<
//     OrderProduct,
//     "id" | "id_order" | "id_user" | "qty"
// >
// export type TTransactionUpdate = Omit<OrderProduct, "created_at" | "updated_at">;
export type TOrderTransactionCreate = {
	order: TOrderCreate
	orderProduct: TOrderProductCreateTransaction[]
	orderReceiver: TReceiverCreate
}

export type TOrderTransactionDB = {
	order: TOrderDB
	orderProduct: TOrderProductDB[]
	orderReceiver: TReceiverDB
}
export type TOrderTransactionUpdate = {
	order?: TOrderCreate
	orderProduct?: TOrderProductCreateTransaction[] // Assuming full replacement of products is required
	orderReceiver?: TReceiverCreate
}
