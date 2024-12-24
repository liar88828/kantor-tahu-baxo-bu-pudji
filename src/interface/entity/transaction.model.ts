import { TOrderCreate } from "@/interface/entity/order.model"
import { TCustomersDB, TReceiverCreate } from "@/interface/entity/receiver.model";
import { TOrderTrolleyTransaction, TTrolleyProductDB } from "@/interface/entity/trolley.model";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { Orders, Payments } from "@prisma/client";

export type OrderId = TOrderTransactionDB['id'];

export type TOrderTransactionCreate = {
	order: TOrderCreate
	orderTrolley: TOrderTrolleyTransaction[]
    orderReceiver: TReceiverCreate & { id?: string }
}

export type TOrderTransactionDB = Orders & {
	Deliverys: TDeliveryDB
	Payments: Payments
	Customers: TCustomersDB
	Trolleys: TTrolleyProductDB[]
}
export type TOrderTransactionUpdate = {
	order: TOrderCreate
	orderTrolley: TOrderTrolleyTransaction[] // Assuming full replacement of products is required
	orderReceiver: TReceiverCreate
}

// export type TOrderProductCreate = Omit<
//     TTrolleyDB,
//     "id" | "id_order" | "id_user" | "qty"
// >
// export type TTransactionUpdate = Omit<TTrolleyDB, "created_at" | "updated_at">;