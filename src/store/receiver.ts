import { create } from "zustand";
import { TReceiverCreate } from "@/entity/receiver.model";

type ReceiverStore = {
	data: TReceiverCreate
	setData: (data: Partial<TReceiverCreate>) => void
}

export const useReceiverStore = create<ReceiverStore>((set) => ({
	data: {
		address: "",
		name: "",
		phone: "",
		userId: '1da116c8-2d8a-4f9b-ae93-37cbad1bd832',

	},
	setData: (data) =>
		set((state) => ({
			data: {
				...state.data, // Preserve existing data
				...data, // Merge in new updates
			},
		})),
}))

// export const initializeOrderData = (initialData: TOrderTransactionCreate) => {
// 	const { onData, setData, setReceiver, onReceiver } = useOrderStore.getState();
// 	useOrderStore.setState({ onData: initialData });
// };
//
// export default useOrderStore;
