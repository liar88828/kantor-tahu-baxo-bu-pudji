import { OrderProduct } from "@prisma/client"
import { TOrderCreate, TOrderDB } from "@/entity/order.model"
import { TReceiverCreate, TReceiverDB } from "@/validation/receiver.valid"

export type TOrderProductDB = OrderProduct
export type TOrderProductCreate = Omit<
  OrderProduct,
  "id" | "created_at" | "updated_at" | "id_order"
>
// export type TTransactionUpdate = Omit<OrderProduct, "created_at" | "updated_at">;
export type TOrderTransactionCreate = {
  order: TOrderCreate
  orderProduct: TOrderProductCreate[]
  orderReceiver: TReceiverCreate
}

export type TOrderTransactionDB = {
  order: TOrderDB
  orderProduct: TOrderProductDB[]
  orderReceiver: TReceiverDB
}
export type TOrderTransactionUpdate = {
  order?: TOrderCreate
  orderProduct?: TOrderProductCreate[] // Assuming full replacement of products is required
  orderReceiver?: TReceiverCreate
}
