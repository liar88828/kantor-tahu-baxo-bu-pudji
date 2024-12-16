import { create } from "zustand";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { paymentAll } from "@/network/payment";
import toast from "react-hot-toast";

interface PaymentStore {
	paymentData: TPaymentDB[]
	payment: TPaymentDB | null
	search: string
	setPayment: (data: TPaymentDB | null) => void
	getPaymentData: () => Promise<void>
	setSearch: (search: string) => void
	isLoading: boolean;

}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
	isLoading: false,
	paymentData: [],
	payment: null,
	search: '',
	setPayment: (data) => set({ payment: data }),
	getPaymentData: async () => {
		try {
			set({ isLoading: true });
			if (get().paymentData.length === 0) {
				const { data } = await paymentAll()
				if (data.data.length > 0) {
					set({ paymentData: data.data })
				}
			}
		} catch (e) {
			if (e instanceof Error) {
				toast.error(e.message)
			}
		} finally {
			set({ isLoading: false });

		}
	},
	setSearch: (search) => set(({ search }))
}))