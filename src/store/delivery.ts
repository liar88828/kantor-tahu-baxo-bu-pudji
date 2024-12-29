import { create } from "zustand";
import { deliveryAll } from "@/network/delivery";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import toast from "react-hot-toast";

interface DeliveryStore {
	isLoading: boolean;
	deliveryData: TDeliveryDB[]
	delivery: TDeliveryDB | null
	search: string
	setDelivery: (data: TDeliveryDB | null) => void
	getDeliveryData: () => Promise<void>
	setSearch: (search: string) => void
	reset: () => void
}

const initialState = {
	deliveryData: [],
	delivery: null,
	search: '',
	isLoading: false,
}

export const useDeliveryStore = create<DeliveryStore>((set, get) => ({
	...initialState,
	reset: () => set(initialState),
	setDelivery: (data) => set({ delivery: data }),
	getDeliveryData: async () => {
		try {
			set({ isLoading: true });
			if (get().deliveryData.length === 0) {
				const { data } = await deliveryAll()
				if (data.data.length > 0) {
					set({ deliveryData: data.data })
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
	setSearch: (search) => set(({ search })),
}))