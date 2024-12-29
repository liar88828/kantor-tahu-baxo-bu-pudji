import { TOrderTransactionCreate } from "@/interface/entity/transaction.model";
import { create } from "zustand";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { TTrolleyProductUser } from "@/interface/entity/trolley.model";
import { TReceiverCreate } from "@/interface/entity/receiver.model";
import { OrderCreateClient } from "@/validation/order.valid";
import { orderTransactionSanitize } from "@/sanitize/orderSanitize";
import { receiverUser } from "@/network/receiver";

export type DataOrder = {
	payment: TPaymentDB,
	delivery: TDeliveryDB,
	product: TTrolleyProductUser[],
	order: OrderCreateClient,
    receiver: TReceiverCreate & { id: string },
};

type OrderType = {
	total: number;
	pricePayment: number
	priceDelivery: number
	onData: TOrderTransactionCreate | null,
	onReceiver: TOrderTransactionCreate['orderReceiver'] | null,
	onDelivery: TDeliveryDB | null,
	onPayment: TPaymentDB | null,
    status: string,
    //
    setStatus: (status: string) => void,
	setDelivery: (data: TDeliveryDB | null) => void,
	setPayment: (data: TPaymentDB | null) => void,
	setReceiver: (data: TOrderTransactionCreate['orderReceiver'] | null) => void,
	setData: (data: DataOrder) => TOrderTransactionCreate,
	setProduct: (data: DataOrder['product']) => void,
	setTotal: (data: { totalProduct: number, pricePayment?: number, priceDelivery?: number }) => void,
	reset: () => void
    getAsyncReceiver: () => Promise<void>,

}

const initialState = {
    status: '',
	onData: null,
	onReceiver: null,
	onDelivery: null,
	onPayment: null,
	total: 0,
	pricePayment: 0,
	priceDelivery: 0,
}

export const useOrderStore = create<OrderType>((set, get) => ({
	...initialState,
    setStatus: (status: string) => set((state) => ({
        status: state.status === status ? '' : status,
    })),
    getAsyncReceiver: async () => {
        const data = await receiverUser()
        set(() => ({
            onReceiver: data.data
        }))
    },
	reset: () => set(initialState),
	setProduct: (data: DataOrder['product']) => {
	},
	setTotal: ({ totalProduct, pricePayment, priceDelivery }) => {
		set(() => {
			const payment = !pricePayment ? get().pricePayment : pricePayment
			const delivery = !priceDelivery ? get().priceDelivery : priceDelivery
			return {
				total: totalProduct + (payment + delivery),
				pricePayment: payment,
				priceDelivery: delivery,
			}
		})
	},
	setReceiver: (data: TOrderTransactionCreate['orderReceiver'] | null) => set(() => ({ onReceiver: data })),
	setPayment: (data: TPaymentDB | null) => set(() => ({ onPayment: data })),
	setDelivery: (data: TDeliveryDB | null) => set(() => ({ onDelivery: data })),
	getDelivery: (data: TDeliveryDB | null) => set(() => ({ onDelivery: data })),
	setData: (data: DataOrder) => {
		const newData = orderTransactionSanitize(data)
		set({ onData: newData })
		return newData
	},

}))

// export const initializeOrderData = (initialData: TOrderTransactionCreate) => {
// 	const { onData, setData, setReceiver, onReceiver } = useOrderStore.getState();
// 	useOrderStore.setState({ onData: initialData });
// };
//
// export default useOrderStore;
