import { TOrderTransactionCreate } from "@/entity/transaction.model";
import { create } from "zustand";
import { TDeliveryDB } from "@/entity/delivery.model";
import { TPaymentDB } from "@/entity/payment.model";
import { userId } from "@/network/trolley";
import { TTrolleyProduct } from "@/entity/trolley.model";

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
	setData: (data: { trolley: TTrolleyProduct[] }) => void,
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
	setData: (data: {
		trolley: TTrolleyProduct[],

	}) => set((store) => {
		if (store) {
			if (store.onReceiver && store.onDelivery && store.onPayment) {
				const sendData: TOrderTransactionCreate = {
					orderReceiver: store.onReceiver,
					orderTrolley: data.trolley.map(d => (
						{
							qty_at_buy: d.qty_at_buy,
							price_at_buy: d.price_at_buy,
							id_user: userId,
							id_product: d.id_product
						})),
					order: {
						address: store.onReceiver.address,
						desc: '',
						nameCs: '',
						orderTime: new Date(),
						sendTime: new Date(),
						id_delivery: store.onDelivery.id,
						nameDelivery: store.onDelivery.name,
						phoneDelivery: store.onDelivery.phone,
						priceDelivery: store.onDelivery.price,
						id_payment: store.onDelivery.id,
						totalPayment: 0,
						totalAll: 0,
						status: '',
					}
				}
				return { onData: sendData }
			}
		}
		return store
	}),

}))

// export const initializeOrderData = (initialData: TOrderTransactionCreate) => {
// 	const { onData, setData, setReceiver, onReceiver } = useOrderStore.getState();
// 	useOrderStore.setState({ onData: initialData });
// };
//
// export default useOrderStore;
