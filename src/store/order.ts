import { TOrderTransactionCreate } from "@/interface/entity/transaction.model";
import { create } from "zustand";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { userId } from "@/network/trolley";
import { TTrolleyProductUser } from "@/interface/entity/trolley.model";
import { TReceiverCreate } from "@/interface/entity/receiver.model";
import { OrderCreateClient } from "@/validation/order.valid";

type DataOrder = {
	payment: TPaymentDB,
	delivery: TDeliveryDB,
	product: TTrolleyProductUser[],
	order: OrderCreateClient,
	receiver: TReceiverCreate,
};
type OrderType = {
	total: number;
	pricePayment: number
	priceDelivery: number
	onData: TOrderTransactionCreate | null,
	onReceiver: TOrderTransactionCreate['orderReceiver'] | null,
	onDelivery: TDeliveryDB | null,
	onPayment: TPaymentDB | null,
	setDelivery: (data: TDeliveryDB | null) => void,
	setPayment: (data: TPaymentDB | null) => void,
	setReceiver: (data: TOrderTransactionCreate['orderReceiver'] | null) => void,
	setData: (data: DataOrder) => void,
	setProduct: (data: DataOrder['product']) => void,
	setTotal: (data: { totalProduct: number, pricePayment?: number, priceDelivery?: number }) => void,
}

export const useOrderStore = create<OrderType>((set, get) => ({
	onData: null,
	onReceiver: null,
	onDelivery: null,
	onPayment: null,
	total: 0,
	pricePayment: 0,
	priceDelivery: 0,
	setProduct: (data: DataOrder['product']) => {
	},
	setTotal: ({ totalProduct, pricePayment, priceDelivery }) => {
		console.log(totalProduct, pricePayment);
		set(() => {
			const payment = !pricePayment ? get().pricePayment : pricePayment
			const delivery = !priceDelivery ? get().pricePayment : priceDelivery
			return {
				total: (totalProduct + payment + delivery),
				pricePayment: payment,
				priceDelivery: delivery,
			}
		})
	},
	setReceiver: (data: TOrderTransactionCreate['orderReceiver'] | null) => set(() => ({ onReceiver: data })),
	setPayment: (data: TPaymentDB | null) => set(() => ({ onPayment: data })),
	setDelivery: (data: TDeliveryDB | null) => set(() => ({ onDelivery: data })),
	getDelivery: (data: TDeliveryDB | null) => set(() => ({ onDelivery: data })),
	setData: ({ delivery, order, receiver, payment, product }: DataOrder) => {
		set(() => {
			const sendData: TOrderTransactionCreate = {
				orderReceiver: receiver,
				orderTrolley: product.map(d => (
					{
						qty_at_buy: d.qty_at_buy,
						price_at_buy: d.price_at_buy,
						id_user: userId,
						id_product: d.id_product
					})),
				order: {
					address: order.addressCs,
					desc: order.desc,
					nameCs: order.nameCs,
					orderTime: order.orderTime,
					sendTime: order.sendTime,
					id_delivery: delivery.id,
					nameDelivery: order.nameDelivery,
					phoneDelivery: order.phoneDelivery,
					priceDelivery: order.priceDelivery,
					id_payment: payment.id,
					totalPayment: order.totalPayment,
					totalAll: order.totalAll,
					status: order.status,
				}
			}
			return { onData: sendData }
		})
	},

}))

// export const initializeOrderData = (initialData: TOrderTransactionCreate) => {
// 	const { onData, setData, setReceiver, onReceiver } = useOrderStore.getState();
// 	useOrderStore.setState({ onData: initialData });
// };
//
// export default useOrderStore;
