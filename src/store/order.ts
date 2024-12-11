import { TOrderTransactionCreate } from "@/entity/transaction.model";
import { create } from "zustand";
import { TDeliveryDB } from "@/entity/delivery.model";
import { TPaymentDB } from "@/entity/payment.model";

type OrderType = {
	onData: TOrderTransactionCreate | null,
	onReceiver: TOrderTransactionCreate['orderReceiver'] | null,
	onDelivery: TDeliveryDB | null,
	onPayment: TPaymentDB | null,
	setDelivery: (data: TDeliveryDB) => void,
	setPayment: (data: TPaymentDB) => void,
	setReceiver: (data: TOrderTransactionCreate['orderReceiver']) => void,
	setData: (data: TOrderTransactionCreate) => void,

}

export const useOrderStore = create<OrderType>((set) => ({
	onData: null,
	onReceiver: null,
	onDelivery: null,
	onPayment: null,
	setReceiver: (data: TOrderTransactionCreate['orderReceiver']) => set((state) => ({ onReceiver: data })),
	setPayment: (data: TPaymentDB) => set((state) => ({ onPayment: data })),
	setDelivery: (data: TDeliveryDB) => set((state) => ({ onDelivery: data })),
	setData: (data: TOrderTransactionCreate) => set((store) => ({
		onData: data,
	})),

}))

// export const initializeOrderData = (initialData: TOrderTransactionCreate) => {
// 	const { onData, setData, setReceiver, onReceiver } = useOrderStore.getState();
// 	useOrderStore.setState({ onData: initialData });
// };
//
// export default useOrderStore;
