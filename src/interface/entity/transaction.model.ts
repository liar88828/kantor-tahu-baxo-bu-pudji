import { TOrderCreate } from "@/interface/entity/order.model"
import { TReceiverCreate, TReceiverDB } from "@/interface/entity/receiver.model";
import { TOrderTrolleyTransaction, TTrolleyProductDB } from "@/interface/entity/trolley.model";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { Orders, Payments } from "@prisma/client";

export type OrderId = TOrderTransactionDB['id'];

export type TOrderTransactionCreate = {
	order: TOrderCreate
	orderTrolley: TOrderTrolleyTransaction[]
	orderReceiver: TReceiverCreate
}

export type TOrderTransactionDB = Orders & {
	Deliverys: TDeliveryDB
	Payments: Payments
	Receivers: TReceiverDB
	Trolleys: TTrolleyProductDB[]
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