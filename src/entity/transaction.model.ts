import { TOrderCreate, TOrderDB } from "@/entity/order.model"
import { TReceiverCreate, TReceiverDB } from "@/entity/receiver.model";
import { TOrderTrolleyTransaction, TTrolleyDB } from "@/entity/trolley.model";

export type TOrderTransactionCreate = {
	order: TOrderCreate
	orderTrolley: TOrderTrolleyTransaction[]
	orderReceiver: TReceiverCreate
}

export type TOrderTransactionDB = {
	order: TOrderDB
	orderProduct: TTrolleyDB[]
	orderReceiver: TReceiverDB
}
export type TOrderTransactionUpdate = {
	order?: TOrderCreate
	orderOrder?: TOrderTrolleyTransaction[] // Assuming full replacement of products is required
	orderReceiver?: TReceiverCreate
}

// export type TOrderProductCreate = Omit<
//     TTrolleyDB,
//     "id" | "id_order" | "id_user" | "qty"
// >
// export type TTransactionUpdate = Omit<TTrolleyDB, "created_at" | "updated_at">;